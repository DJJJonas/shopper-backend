import { DataSource } from 'typeorm';
import { CUSTOMER_REPOSITORY } from '~/common/constants';
import { Customer } from '../core/customer.entity';
import { Provider } from '@nestjs/common';

export const customerProviders = [
  {
    provide: CUSTOMER_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Customer),
    inject: [DataSource],
  } as Provider,
];
