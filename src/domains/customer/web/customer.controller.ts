import {
  BadRequestException,
  Controller,
  Get,
  NotFoundException,
  Param,
  Query,
  UseFilters,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MEASURE_TYPES, MeasureType } from '~/common/constants';
import { BadRequestFilter } from '~/common/filters/bad-request/bad-request.filter';
import { makeError } from '~/common/util/http-error.util';
import { Measure } from '~/domains/measure/core/measure.entity';
import { CustomerService } from '../service/customer.service';
import { ListResponseBody } from './dto/list.dto';
import { ApiCustomerList } from './swagger/list.decorator';

@Controller()
@ApiTags('Customer')
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  @Get(':code/list')
  @UseFilters(new BadRequestFilter('INVALID_TYPE'))
  @ApiCustomerList()
  async list(
    @Param('code') customerCode: string,
    @Query('measure_type') measureType?: MeasureType,
  ) {
    if (measureType && !MEASURE_TYPES.includes(measureType)) {
      const message = makeError('Tipo de medição não permitida');
      throw new BadRequestException(message);
    }
    const measures: Measure[] = await this.customerService.findMeasuresByType(
      customerCode,
      measureType,
    );

    if (!measures?.length) {
      const message = makeError(
        'MEASURES_NOT_FOUND',
        'Nenhuma leitura encontrata',
      );
      throw new NotFoundException(message);
    }

    return new ListResponseBody(customerCode, measures);
  }
}
