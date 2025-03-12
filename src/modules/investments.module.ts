import { Module } from '@nestjs/common';
import { InvestmentsService } from '@services/investments.service';
import { InvestmentsController } from '@controllers/investments.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Investment, InvestmentSchema } from '@models/investment.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Investment.name, schema: InvestmentSchema },
    ]),
  ],

  providers: [InvestmentsService],
  controllers: [InvestmentsController],
})
export class InvestmentsModule {}
