import { ApiProperty } from '@nestjs/swagger';
import { IsBase64, IsDateString, IsString } from 'class-validator';
import { UUID } from 'crypto';
import { MEASURE_TYPES, MeasureType } from '~/common/constants';
import { IsMeasureType } from '~/common/decoratos/is-measure-type/is-measure-type.decorator';

export class UploadRequestBody {
  @IsBase64()
  @ApiProperty({ format: 'base64' })
  image: string;

  @IsString()
  @ApiProperty()
  customer_code: string;

  @IsDateString()
  @ApiProperty()
  measure_datetime: Date;

  @IsMeasureType()
  @ApiProperty({ enum: MEASURE_TYPES })
  measure_type: MeasureType;
}

export class UploadResponseBody {
  @ApiProperty()
  image_url: string;

  @ApiProperty()
  measure_value: number;

  @ApiProperty()
  measure_uuid: UUID;

  constructor(image_url: string, measure_value: number, measure_uuid: UUID) {
    this.image_url = image_url;
    this.measure_value = measure_value;
    this.measure_uuid = measure_uuid;
  }
}
