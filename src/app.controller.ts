import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('policyFamily')
  getPolicyFamilies(): any {
    return this.appService.getPolicyFamilies();
  }

  @Get('policy/:id')
  getPolicyById(@Param('id') id): string {
    return this.appService.getPolicyById(id);
  }
}
