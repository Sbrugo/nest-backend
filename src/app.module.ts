import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InvestmentsModule } from '@src/modules/investments.module';
import { AppService } from '@src/app.service';
import { AppController } from '@src/app.controller';
import { DatabaseModule } from '@src/modules/database/database.module';
import { UsersModule } from '@src/modules/users.module';
import * as dotenv from 'dotenv';
import { getMongoUri } from '../config';
import { AuthModule } from '@src/modules/auth.module';

dotenv.config();

@Module({
  imports: [
    InvestmentsModule,
    MongooseModule.forRoot(getMongoUri()),
    DatabaseModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
