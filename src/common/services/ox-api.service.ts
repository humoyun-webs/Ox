import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosInstance } from 'axios';

@Injectable()
export class OxApiService {
  private readonly axiosInstance: AxiosInstance;

  constructor(private configService: ConfigService) {
    this.axiosInstance = axios.create({
      timeout: 10000,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });
  }

  async validateToken(token: string, subdomain: string): Promise<boolean> {
    try {
      const url = `https://${subdomain}.ox-sys.com/profile`;
      const response = await this.axiosInstance.get(url, {
        headers: {
          'Authorization': token,
        },
      });
      
      return response.status === 200;
    } catch (error) {
      return false;
    }
  }

  async getVariations(subdomain: string, token: string, page: number, size: number): Promise<any> {
    try {
      const url = `https://${subdomain}.ox-sys.com/variations`;
      const response = await this.axiosInstance.get(url, {
        headers: {
          'Authorization': token,
        },
        params: {
          page,
          size,
        },
      });
      
      return response.data;
    } catch (error) {
      throw new HttpException(
        'Failed to fetch products from OX API',
        HttpStatus.BAD_GATEWAY,
      );
    }
  }
} 