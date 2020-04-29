import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinTable, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { PolicyRevision } from './PolicyRevision.entity';

@Entity('Policy_objective_tbl')
export class PolicyObjective {
    @PrimaryGeneratedColumn({ name: 'Policy_info_ID' })
    id: number;

    @Column({ name: 'Control Objective:' })
    text: string;

    @OneToOne(type => PolicyRevision, revision => revision.objective)
    @JoinColumn({ name: 'Policy_Rev_ID' })
    revision: PolicyRevision;
}