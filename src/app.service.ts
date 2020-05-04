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

  async getPolicyFamilies(): Promise<PolicyFamily[]> {
    let policyFamilies = await this.policyFamilyRepository
    .find({
      relations: ['policies', 'policies.revisions', 'policies.revisions.procedure', 'policies.revisions.objective', 'policies.revisions.procedureControl', 'policies.revisions.deficiencies',  'policies.revisions.processes'],
    });

    policyFamilies.forEach( (family) =>  {
      family.sort = Math.min(...family.policies.map(policy => policy?.revisions[policy.revisions.length - 1]?.sort).filter((number) => number != null));
      family.policies = family.policies.filter((policy) => policy.revisions.length);
      family.policies.sort((policyA, policyB) => {
        const revisionA = policyA?.revisions[policyA.revisions.length - 1];
        const revisionB = policyB?.revisions[policyA.revisions.length - 1];

        return (revisionA?.sort || 0) - (revisionB?.sort || 0);
      });
    });

    policyFamilies.sort(
      (familyA, familyB) => {
        return familyA.sort - familyB.sort;
      }
    )

    return policyFamilies;
  }

  getPolicyById(id: number): any {
    return this.policyRepository.findOne(id, { relations: ['revisions', 'revisions.procedure', 'revisions.objective', 'revisions.procedureControl']});
  }
}
