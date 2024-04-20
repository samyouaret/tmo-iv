import { config } from 'dotenv';
import { join } from 'path';
import { DataSource } from 'typeorm';

config();

export const typeOrmDataSource: DataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  migrationsTableName: 'migrations',
  migrationsRun: false,
  entities: ['src/**/*.entity.{js,ts}'],
  migrations: [join(`${__dirname}/migrations/*{.ts,.js}`)],
});
