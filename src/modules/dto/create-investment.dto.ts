import { IsNumber, IsOptional, IsPositive } from 'class-validator';
import { Types } from 'mongoose';

export class CreateInvestmentDto {
  @IsOptional()
  id?: Types.ObjectId;

  @IsNumber()
  @IsPositive()
  principal!: number;

  @IsNumber()
  @IsPositive()
  rate!: number;

  @IsNumber()
  @IsPositive()
  years!: number;
}
