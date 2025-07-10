import { Controller, Post, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CompanyService } from './company.service';
import { RegisterCompanyDto } from '../common/dto/auth.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@ApiTags('Company')
@Controller('company')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new company or join existing one' })
  @ApiResponse({ status: 201, description: 'Company registered successfully' })
  @ApiResponse({ status: 403, description: 'Invalid token or subdomain' })
  async registerCompany(
    @Request() req,
    @Body() registerCompanyDto: RegisterCompanyDto,
  ) {
    return this.companyService.registerCompany(req.user.id, registerCompanyDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete company (admin only)' })
  @ApiResponse({ status: 200, description: 'Company deleted successfully' })
  @ApiResponse({ status: 403, description: 'Only company admin can delete the company' })
  async deleteCompany(@Request() req, @Param('id') id: string) {
    return this.companyService.deleteCompany(req.user.id, parseInt(id));
  }
} 