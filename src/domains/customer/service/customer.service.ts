import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MeasureType } from '~/common/constants';
import { Measure } from '~/domains/measure/core/measure.entity';
import { Customer } from '../core/customer.entity';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
    @InjectRepository(Measure)
    private measureRepository: Repository<Measure>,
  ) {}

  async findMeasuresByType(
    customerId: string,
    measureType?: MeasureType,
  ): Promise<Measure[]> {
    let measures: Measure[];
    if (measureType) {
      measures = await this.measureRepository.findBy({
        customer: { id: customerId },
        type: measureType,
      });
    } else {
      measures = await this.measureRepository.findBy({
        customer: { id: customerId },
      });
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
