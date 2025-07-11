import { Injectable, ForbiddenException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { OxApiService } from '../common/services/ox-api.service';
import { RegisterCompanyDto } from '../common/dto/auth.dto';

export enum Role {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
}

@Injectable()
export class CompanyService {
  constructor(
    private prisma: PrismaService,
    private oxApiService: OxApiService,
  ) {}

  async registerCompany(userId: number, registerCompanyDto: RegisterCompanyDto) {
    const { token, subdomain } = registerCompanyDto;

    // Validate token with OX API
    const isValidToken = await this.oxApiService.validateToken(token, subdomain);
    if (!isValidToken) {
      throw new ForbiddenException('Invalid token or subdomain');
    }

    // Check if company already exists
    const existingCompany = await this.prisma.company.findUnique({
      where: { subdomain },
    });

    if (existingCompany) {
      // Add user to existing company as manager
      await this.prisma.user.update({
        where: { id: userId },
        data: {
          companies: {
            connect: { id: existingCompany.id },
          },
        },
      });

      return {
        message: 'User added to existing company as manager',
        company: existingCompany,
        role: Role.MANAGER,
      };
    }

    // Create new company and make user admin
    const company = await this.prisma.company.create({
      data: {
        subdomain,
        token,
        adminId: userId,
        users: {
          connect: { id: userId },
        },
      },
    });

    // Update user role to admin
    await this.prisma.user.update({
      where: { id: userId },
      data: { role: Role.ADMIN },
    });

    return {
      message: 'Company registered successfully',
      company,
      role: Role.ADMIN,
    };
  }

  async deleteCompany(userId: number, companyId: number) {
    const company = await this.prisma.company.findUnique({
      where: { id: companyId },
      include: { admin: true },
    });

    if (!company) {
      throw new ForbiddenException('Company not found');
    }

    if (company.adminId !== userId) {
      throw new ForbiddenException('Only company admin can delete the company');
    }

    await this.prisma.company.delete({
      where: { id: companyId },
    });

    return {
      message: 'Company deleted successfully',
    };
  }
} 