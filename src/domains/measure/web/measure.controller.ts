import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  HttpCode,
  NotFoundException,
  Patch,
  Post,
  UseFilters,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BadRequestFilter } from '~/common/filters/bad-request/bad-request.filter';
import { makeError } from '~/common/util/http-error.util';
import { Measure } from '../core/measure.entity';
import { MeasureService } from '../service/measure.service';
import { ConfirmRequestBody, ConfirmResponseBody } from './dto/confirm.dto';
import { UploadRequestBody, UploadResponseBody } from './dto/upload.dto';
import { ApiMeasureUpload } from './swagger/upload.decorator';
import { ApiMeasureConfirm } from './swagger/confirm.decorator';

@Controller()
@ApiTags('Measure')
export class MeasureController {
  constructor(private measureService: MeasureService) {}

  @Post('upload')
  @HttpCode(200)
  @UseFilters(new BadRequestFilter('INVALID_DATA'))
  @ApiMeasureUpload()
  async upload(@Body() body: UploadRequestBody) {
    const { image, customer_code, measure_datetime, measure_type } = body;

    const read = await this.measureService.isAlreadyRead(
      customer_code,
      measure_type,
      measure_datetime,
    );
    if (read) {
      const message = makeError('DOUBLE_REPORT', 'Leitura do mês já realizada');
      throw new ConflictException(message);
    }

    let measure: Measure;
    try {
      measure = await this.measureService.save(
        customer_code,
        image,
        new Date(measure_datetime),
        measure_type,
      );
    } catch (error) {
      if (error instanceof Error)
        throw new BadRequestException(makeError(error.message));
    }

    return new UploadResponseBody(measure.imageUrl, measure.value, measure.id);
  }

  @Patch('confirm')
  @HttpCode(200)
  @UseFilters(new BadRequestFilter('INVALID_DATA'))
  @ApiMeasureConfirm()
  async confirm(@Body() body: ConfirmRequestBody) {
    const found = await this.measureService.exists(body.measure_uuid);
    if (!found) {
      throw new NotFoundException(
        'MEASURE_NOT_FOUND',
        'Leitura não encontrada',
      );
    }
    const confirmed = await this.measureService.isAlreadyConfirmed(
      body.measure_uuid,
    );
    if (confirmed) {
      throw new ConflictException(
        makeError('CONFIRMATION_DUPLICATE', 'Leitura do mês já realizada'),
      );
    }

    await this.measureService.confirm(body.measure_uuid, body.confirmed_value);
    return new ConfirmResponseBody();
  }
}
