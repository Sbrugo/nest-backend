import { Controller, Get } from '@nestjs/common';
import { AppService } from '@src/app.service';
import { DatabaseService } from '@src/modules/database/database.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly databaseService: DatabaseService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('check-db')
  checkDbConnection() {
    this.databaseService.checkConnection();
  }
}
