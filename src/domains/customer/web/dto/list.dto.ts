import { ApiProperty } from '@nestjs/swagger';
import { UUID } from 'crypto';
import { MeasureType } from '~/common/constants';
import { Measure } from '~/domains/measure/core/measure.entity';

export class MeasureListResponseBody {
  @ApiProperty()
  measure_uuid: UUID;

  @ApiProperty()
  measure_datetime: string;

  @ApiProperty()
  measure_type: MeasureType;

  @ApiProperty()
  has_confirmed: boolean;

  @ApiProperty()
  image_url: string;

  constructor(measure: Measure) {
    this.measure_uuid = measure.id;
    this.measure_datetime = measure.datetime.toISOString();
    this.measure_type = measure.type;
    this.has_confirmed = measure.confirmed;
    this.image_url = measure.imageUrl;
  }
}

export class ListResponseBody {
  @ApiProperty()
  customer_code: string;

  @ApiProperty({ isArray: true, type: MeasureListResponseBody })
  measures: MeasureListResponseBody[];

  constructor(customerCode: string, measures: Measure[]) {
    this.customer_code = customerCode;
    this.measures = measures.map(
      (measure) => new MeasureListResponseBody(measure),
    );
  }
}
