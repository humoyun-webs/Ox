import { IsEmail, IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;
}

export class VerifyOtpDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: '123456' })
  @IsString()
  @IsNotEmpty()
  otp: string;
}

export class RegisterCompanyDto {
  @ApiProperty({ example: 'Bearer xyz' })
  @IsString()
  @IsNotEmpty()
  token: string;

  @ApiProperty({ example: 'demo' })
  @IsString()
  @IsNotEmpty()
  subdomain: string;
} 