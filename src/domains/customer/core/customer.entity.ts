import { Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Measure } from '~/domains/measure/core/measure.entity';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => Measure, (measure) => measure.customer)
  measures: Measure[];

  constructor(id: string) {
    this.id = id;
  }
}
