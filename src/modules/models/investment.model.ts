import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type InvestmentDocument = HydratedDocument<Investment>;

@Schema()
export class Investment {
  @Prop({ required: true, min: 0 })
  principal!: number;

  @Prop({ required: true, min: 0 })
  rate!: number;

  @Prop({ required: true, min: 0 })
  years!: number;

  @Prop({ default: 'active', enum: ['active', 'inactive', 'pending'] })
  status!: string;
}

export const InvestmentSchema = SchemaFactory.createForClass(Investment);
