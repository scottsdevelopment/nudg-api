import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PolicyFamily } from './entities/PolicyFamily.entity';
import { Policy } from './entities/Policy.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(PolicyFamily)
    private policyFamilyRepository: Repository<PolicyFamily>,
    @InjectRepository(Policy)
    private policyRepository: Repository<Policy>,
  
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  getPolicyFamilies(): any {
    return this.policyFamilyRepository.find({
      relations: ['policies', 'policies.revisions']
    });
  }

  getPolicyById(id: number): any {
    return this.policyRepository.findOne(id, { relations: ['revisions', 'revisions.procedure', 'revisions.objective', 'revisions.procedureControl']});
  }
}
