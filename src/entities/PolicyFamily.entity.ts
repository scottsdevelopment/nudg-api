import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinTable } from 'typeorm';
import { Policy } from './Policy.entity';

@Entity('Policy_family_tbl')
export class PolicyFamily {
    @PrimaryGeneratedColumn({ name: 'Policy_Family_ID' })
    id: number;

    @Column({ name: 'Policy_Family:' })
    name: string;

    @OneToMany(type => Policy, policy => policy.policyFamily)
    policies: Policy[];

    sort?: number;
}