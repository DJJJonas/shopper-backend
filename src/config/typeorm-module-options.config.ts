import { TypeOrmModuleOptions } from '@nestjs/typeorm';

// Needs to be called after ConfigModule so that .env is loaded
const getTypeORMModuleOptions = (): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  autoLoadEntities: true,
  migrations: [__dirname + '/database/migrations/*{.ts,.js}'],
  migrationsRun: true,
  migrationsTableName: 'migrations',
});

export default getTypeORMModuleOptions;
