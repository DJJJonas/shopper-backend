import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UUID } from 'crypto';
import { Repository } from 'typeorm';
import {
  MEASURE_REPOSITORY,
  MeasureType,
  ValidGeminiMimeType,
} from '~/common/constants';
import { CustomerService } from '~/domains/customer/service/customer.service';
import { GeminiService } from '~/providers/gemini/gemini.service';
import { Measure } from '../core/measure.entity';

@Injectable()
export class MeasureService {
  constructor(
    @Inject(MEASURE_REPOSITORY)
    private measureRepository: Repository<Measure>,
    @Inject(forwardRef(() => CustomerService))
    private customerService: CustomerService,
    private geminiService: GeminiService,
  ) {}

  async findAllFrom(customerId: string): Promise<Measure[]> {
    return await this.measureRepository.findBy({
      customer: { id: customerId },
    });
  }

  async findAllFromType(
    customerId: string,
    type: MeasureType,
  ): Promise<Measure[]> {
    return await this.measureRepository.findBy({
      customer: { id: customerId },
      type,
    });
  }

  async confirm(measureUuid: UUID, value: number): Promise<void> {
    await this.measureRepository.save({
      id: measureUuid,
      confirmed: true,
      value,
    });
  }

  async exists(measure_uuid: UUID) {
    return await this.measureRepository.existsBy({ id: measure_uuid });
  }

  async isAlreadyRead(
    customerId: string,
    type: MeasureType,
    date: string | Date,
  ) {
    if (typeof date === 'string') date = new Date(date);
    const [year, month] = [date.getFullYear(), date.getMonth() + 1];
    const query = `
      SELECT
        COUNT(*) AS count
      FROM
        measure
      WHERE
        customer_id = $1
        AND type = $2
        AND EXTRACT(YEAR FROM datetime) = $3
        AND EXTRACT(MONTH FROM datetime) = $4;
    `;
    const result = await this.measureRepository.query(query, [
      customerId,
      type,
      year,
      month,
    ]);
    return result[0].count > 0;
  }

  async isAlreadyConfirmed(measureUuid: UUID) {
    return await this.measureRepository.existsBy({
      id: measureUuid,
      confirmed: true,
    });
  }

  async save(
    customerCode: string,
    image: string,
    datetime: Date,
    type: MeasureType,
  ) {
    const buffer = Buffer.from(image, 'base64');
    const validMimeType: ValidGeminiMimeType = 'image/png';

    const { imageUrl, value } = await this.geminiService.extractValueFromFile(
      buffer,
      validMimeType,
    );

    const customer = await this.customerService.save(customerCode);

    const measure = await this.measureRepository.save(
      new Measure(customer, imageUrl, datetime, type, value),
    );
    return measure;
  }
}
