import { DataSource } from 'typeorm';
import { Measure } from '../core/measure.entity';
import { MEASURE_REPOSITORY } from '~/common/constants';
import { Provider } from '@nestjs/common';

export const measureProviders = [
  {
    provide: MEASURE_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Measure),
    inject: [DataSource],
  } as Provider,
];
