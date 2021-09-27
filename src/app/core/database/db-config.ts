import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import config from '@root/config';
import entities from './entities';
import { SnakeCaseStrategy } from './naming.strategy';

const dbConfig: TypeOrmModuleOptions = {
  entities,
  type: 'postgres',
  host: config.get('db.host'),
  port: config.get('db.port'),
  username: config.get('db.user'),
  password: config.get('db.password'),
  database: config.get('db.name'),
  synchronize: config.get('db.sync'),
  migrationsRun: false,
  migrations: ['dist/migrations/**/*.js'],
  namingStrategy: new SnakeCaseStrategy(),
  logging: false,
};

export { dbConfig };
