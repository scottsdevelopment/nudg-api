import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { PolicyFamily } from './PolicyFamily.entity';
import { PolicyRevision } from './PolicyRevision.entity';

@Entity('Policy_tbl')
export class Policy {
    @PrimaryGeneratedColumn({ name: 'Policy_ID' })
    id: number;

    @Column({ name: 'Policy_Family_ID' })
    familyId: number;

    @Column({ name: 'Policy Subtitle' })
    name: string;

    // @Column({ name: 'Policy Subtitle' })
    // number: string;

    @Column({ name: 'NIST 800-171 Mapping' })
    nist: string;

    @Column({ name: 'CMMC Level' })
    level: number;

    @Column({ name: 'CMMC Mapping' })
    cmmc: string;

    @Column({ name: 'Task Type' })
    taskType: string;

    @ManyToOne(type => PolicyFamily, policyFamily => policyFamily.policies)
    @JoinColumn({ name: "Policy_Family_ID" })
    policyFamily: PolicyFamily;

    @OneToMany(type => PolicyRevision, policyRevision => policyRevision.policy)
    revisions: PolicyRevision[];
}