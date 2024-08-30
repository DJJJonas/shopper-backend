import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CUSTOMER_REPOSITORY, MeasureType } from '~/common/constants';
import { Measure } from '~/domains/measure/core/measure.entity';
import { MeasureService } from '~/domains/measure/service/measure.service';
import { Customer } from '../core/customer.entity';

@Injectable()
export class CustomerService {
  constructor(
    @Inject(CUSTOMER_REPOSITORY)
    private customerRepository: Repository<Customer>,
    @Inject(forwardRef(() => MeasureService))
    private measureService: MeasureService,
  ) {}

  async findMeasuresByType(
    customerId: string,
    measureType?: MeasureType,
  ): Promise<Measure[]> {
    let measures: Measure[];
    if (measureType) {
      measures = await this.measureService.findAllFromType(
        customerId,
        measureType,
      );
    } else {
      measures = await this.measureService.findAllFrom(customerId);
    }
    return measures;
  }

  async save(customerId: string): Promise<Customer> {
    const customer = new Customer(customerId);
    return await this.customerRepository.save(customer);
  }

  async delete(customerId: string): Promise<void> {
    await this.customerRepository.delete({ id: customerId });
  }
}
