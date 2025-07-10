import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { OxApiService } from '../common/services/ox-api.service';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, OxApiService],
  exports: [ProductsService],
})
export class ProductsModule {} 