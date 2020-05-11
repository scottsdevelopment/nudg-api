import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PolicyFamily } from './entities/PolicyFamily.entity';
import { Policy } from './entities/Policy.entity';
import { RevisionDeficiency } from './entities/RevisionDeficiency.entity';
import { RevisionProcess } from './entities/RevisionProcess.entity';
import { EventGateway } from './events/event.gateway';
import { listenerCount } from 'cluster';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(PolicyFamily)
    private policyFamilyRepository: Repository<PolicyFamily>,
    @InjectRepository(Policy)
    private policyRepository: Repository<Policy>,
    @InjectRepository(RevisionDeficiency)
    private revisionDeficiencyRepository: Repository<RevisionDeficiency>,
    private readonly eventGateway: EventGateway
  ) {}

  async getPolicyFamilies(): Promise<any> {
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

    const policies = policyFamilies.map((family) => family.policies).reduce((policies, list) => [...list, ...policies]);

    const revisions = policies.map((policy) => policy.revisions).reduce((revisions, list) => [...list, ...revisions]);

    const deficiencies = revisions.map(revision => revision.deficiencies).reduce((deficiencies, list) => [...list, ...deficiencies]);

    const objectives = revisions.map(revision => revision.objective);

    const procedures = revisions.map(revision => revision.procedure);

    const procedureControls = revisions.map(revision => revision.procedureControl);

    const processes = revisions.map(revision => revision.processes).reduce((processes, list) => [...list, ...processes]);

    return { policyFamilies, policies, revisions, deficiencies, objectives, procedures, procedureControls, processes };
  }

  getPolicyById(id: number): any {
    return this.policyRepository.findOne(id, { relations: ['revisions', 'revisions.procedure', 'revisions.objective', 'revisions.procedureControl']});
  }

  getDeficiencyById(id: number) {
    return this.revisionDeficiencyRepository.findOne(id);
  }

  async updateDeficiency(id: number, deficiency: Partial<RevisionDeficiency>) {
    await this.revisionDeficiencyRepository.update(id, deficiency);
    const updated = await this.revisionDeficiencyRepository.findOne(id);
    this.eventGateway.server.emit('update', { type: 'RevisionDeficiency', data: updated });
    return updated;
  }

  async createDeficiency(deficiency: Partial<RevisionDeficiency>) {
    const created = await this.revisionDeficiencyRepository.save(deficiency);
    this.eventGateway.server.emit('update', { type: 'RevisionDeficiency', data: created });
    return created;
  }
}
