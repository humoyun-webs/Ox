import { Module } from '@nestjs/common';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { OxApiService } from '../common/services/ox-api.service';

@Module({
  controllers: [CompanyController],
  providers: [CompanyService, OxApiService],
  exports: [CompanyService],
})
export class CompanyModule {} 