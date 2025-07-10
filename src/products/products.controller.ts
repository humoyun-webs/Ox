import { Controller, Get, Query, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { GetProductsDto } from '../common/dto/products.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { ManagerOnly } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';

@ApiTags('Products')
@Controller('products')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ManagerOnly()
  @ApiOperation({ summary: 'Get products list (manager only)' })
  @ApiResponse({ status: 200, description: 'Products retrieved successfully' })
  @ApiResponse({ status: 400, description: 'Size cannot be greater than 20' })
  @ApiResponse({ status: 403, description: 'Access denied or user not associated with company' })
  async getProducts(@Request() req, @Query() query: GetProductsDto) {
    return this.productsService.getProducts(req.user.id, query);
  }
} 