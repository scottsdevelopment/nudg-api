import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PolicyFamily } from './entities/PolicyFamily.entity';
import { Policy } from './entities/Policy.entity';
import { PolicyRevision } from './entities/PolicyRevision.entity';
import { PolicyObjective } from './entities/PolicyObjective.entity';
import { PolicyProcedure } from './entities/PolicyProcedure.entity';
import { ProcedureControl } from './entities/ProcedureControl.entity';
import { RevisionDeficiency } from './entities/RevisionDeficiency.entity';
import { RevisionProcess } from './entities/RevisionProcess.entity';
import { EventModule } from './events/event.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: 'localhost',
      port: 65178,
      username: 'root',
      password: 'root2',
      database: 'NUDG SQL',
      entities: [
        PolicyFamily,
        Policy,
        PolicyRevision,
        PolicyObjective,
        PolicyProcedure,
        ProcedureControl,
        RevisionDeficiency,
        RevisionProcess
      ],
      synchronize: false,
    }),
    TypeOrmModule.forFeature([
      PolicyFamily, 
      Policy, 
      PolicyRevision,
      PolicyObjective,
      PolicyProcedure,
      ProcedureControl,
      RevisionDeficiency,
      RevisionProcess
    ]),
    EventModule,
  ],
  controllers: [AppController],
  providers: [AppService],

})
export class AppModule {}
