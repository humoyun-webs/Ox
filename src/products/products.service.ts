import { Injectable, ForbiddenException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { OxApiService } from '../common/services/ox-api.service';
import { GetProductsDto } from '../common/dto/products.dto';

@Injectable()
export class ProductsService {
  constructor(
    private prisma: PrismaService,
    private oxApiService: OxApiService,
  ) {}

  async getProducts(userId: number, query: GetProductsDto) {
    const { page = 1, size = 10 } = query;

    // Validate size limit
    if (size > 20) {
      throw new BadRequestException('Size cannot be greater than 20');
    }

    // Get user with companies
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        companies: true,
      },
    });

    if (!user || user.companies.length === 0) {
      throw new ForbiddenException('User is not associated with any company');
    }
   
    const company = user.companies[0];

    const products = await this.oxApiService.getVariations(
      company.subdomain,
      company.token,
      page,
      size,
    );

    return {
      data: products,
      pagination: {
        page,
        size,
        company: company.subdomain,
      },
    };
  }
} 