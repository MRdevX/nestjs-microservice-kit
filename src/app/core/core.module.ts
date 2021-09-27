import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConfig } from './database/db-config';
import { HealthModule } from './health/health.module';

@Module({
  imports: [TypeOrmModule.forRoot(dbConfig), HealthModule],
  providers: [],
  exports: [],
})
export class CoreModule {}
