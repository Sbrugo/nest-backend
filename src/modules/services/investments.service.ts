import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';

import { CreateInvestmentDto } from '@dto/create-investment.dto';
import { Investment, InvestmentDocument } from '@models/investment.model';

@Injectable()
export class InvestmentsService {
  constructor(
    @InjectModel(Investment.name)
    private investmentModel: Model<InvestmentDocument>,
  ) {}
  async create(investment: CreateInvestmentDto): Promise<Investment> {
    try {
      return await this.investmentModel.create(investment);
    } catch (error) {
      console.error(error);
      throw new BadRequestException('Invalid data for creating investment');
    }
  }
  async findAll(): Promise<Investment[]> {
    try {
      return await this.investmentModel.find().exec();
    } catch (error) {
      console.error(error);
      throw new BadRequestException('Unable to fetch investments');
    }
  }

  async findOne(id: string): Promise<Investment> {
    if (!mongoose.isValidObjectId(id)) {
      throw new BadRequestException('Invalid ID format');
    }
    const investment = await this.investmentModel.findById(id).exec();
    if (!investment) {
      throw new NotFoundException(`Investment with ID ${id} not found`);
    }
    return investment;
  }
}
