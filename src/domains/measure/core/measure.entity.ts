import { UUID } from 'crypto';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MeasureType } from '~/common/constants';
import { Customer } from '~/domains/customer/core/customer.entity';

@Entity()
export class Measure {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @ManyToOne(() => Customer, (customer) => customer.measures)
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  @Column({ name: 'image_url', type: 'varchar', length: 255 })
  imageUrl: string;

  @Column({ type: 'timestamp' })
  datetime: Date;

  @Column({ type: 'varchar', length: 50 })
  type: MeasureType;

  @Column({ type: 'int' })
  value: number;

  @Column({ type: 'boolean', default: false })
  confirmed: boolean;

  constructor(
    customer: Customer,
    imageUrl: string,
    datetime: Date,
    type: MeasureType,
    value: number,
    confirmed: boolean = false,
  ) {
    this.customer = customer;
    this.imageUrl = imageUrl;
    this.datetime = datetime;
    this.type = type;
    this.value = value;
    this.confirmed = confirmed;
  }
}
