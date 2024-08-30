import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSetup1724891641402 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
CREATE TABLE customer (
    id TEXT PRIMARY KEY
);

CREATE TABLE measure (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id TEXT NOT NULL REFERENCES customer(id) ON DELETE CASCADE,
    image_url VARCHAR(255),
    datetime TIMESTAMP NOT NULL,
    type VARCHAR(50) CHECK (type IN ('WATER', 'GAS')) NOT NULL,
    confirmed BOOLEAN DEFAULT FALSE,
    value INT NOT NULL
);
`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
DROP TABLE measure;
DROP TABLE customer;
`);
  }
}
