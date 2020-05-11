import { Controller, Get, Param, Put, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { RevisionDeficiency } from './entities/RevisionDeficiency.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('store')
  getPolicyFamilies(): any {
    return this.appService.getPolicyFamilies();
  }

  @Get('policy/:id')
  getPolicyById(@Param('id') id): string {
    return this.appService.getPolicyById(id);
  }

  @Get('deficiency/:id')
  getDeficiencyById(@Param('id') id): any {
    return this.appService.getDeficiencyById(id);
  }

  @Post('deficiency/')
  createDeficiency(@Body() deficiency: Partial<RevisionDeficiency>): any {
    return this.appService.createDeficiency(deficiency);
  }

  @Put('deficiency/:id')
  updateDeficiency(@Param('id') id, @Body() deficiency: Partial<RevisionDeficiency>): any {
    return this.appService.updateDeficiency(id, deficiency);
  }
}
