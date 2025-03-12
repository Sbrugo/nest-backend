import {
  IsString,
  IsEmail,
  IsOptional,
  IsEnum,
  MinLength,
  IsDate,
  MaxLength,
} from 'class-validator';
import { UserRole } from '@models/user.model';

export class CreateUserDto {
  @IsString()
  @MinLength(3, { message: 'Username was too short' })
  @MaxLength(30, { message: 'Uff, username was a bit too long' })
  username!: string;

  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(8, { message: 'Password was too short' })
  @MaxLength(50, { message: 'Password was too long' })
  password!: string;

  @IsOptional()
  @IsEnum(UserRole)
  role!: UserRole;

  @IsOptional()
  @IsString()
  @MinLength(2, { message: 'FirstName was too short' })
  @MaxLength(50, { message: 'FirstName was too long' })
  firstName?: string;

  @IsOptional()
  @IsString()
  @MinLength(2, { message: 'LastName was too short' })
  @MaxLength(50, { message: 'LastName was too long' })
  lastName?: string;

  @IsOptional()
  @IsDate()
  dateOfBirth?: Date;

  @IsOptional()
  @IsString()
  bio?: string;
}

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;

  @IsString()
  bio?: string;
}

export class LoginDto {
  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(8, { message: 'Password was too short' })
  password!: string;
}

export class RegisterDto {
  @IsString()
  @MinLength(3, { message: 'Username was too short' })
  @MaxLength(30, { message: 'Uff, username was a bit too long' })
  username!: string;

  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(8, { message: 'Password was too short' })
  password!: string;
}
