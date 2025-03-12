import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { InvestmentsService } from '@services/investments.service';
import { Investment } from '@models/investment.model';
import { CreateInvestmentDto } from '@dto/create-investment.dto';
@Controller('investments')
export class InvestmentsController {
  constructor(private readonly investmentsService: InvestmentsService) {}
  @Post()
  create(@Body() investment: CreateInvestmentDto) {
    return this.investmentsService.create(investment);
  }
  @Get()
  findAll(): Promise<Investment[]> {
    return this.investmentsService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.investmentsService.findOne(id);
  }
}
