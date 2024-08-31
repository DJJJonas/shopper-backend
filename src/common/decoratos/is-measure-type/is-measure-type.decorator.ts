import { applyDecorators } from '@nestjs/common';
import { IsEnum } from 'class-validator';
import { MEASURE_TYPES } from '~/common/constants';

export function IsMeasureType() {
  const message = `measure_type must be one of the following values: ${MEASURE_TYPES.join(', ')}`;
  return applyDecorators(IsEnum(MEASURE_TYPES, { message }));
}
