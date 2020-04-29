import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinTable, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { PolicyRevision } from './PolicyRevision.entity';

@Entity('Policy_procedure_tbl')
export class PolicyProcedure {
    @PrimaryGeneratedColumn({ name: 'Policy Procedure ID' })
    id: number;

    @Column({ name: 'Procedure' })
    text: string;

    @OneToOne(type => PolicyRevision, revision => revision.procedure)
    @JoinColumn({ name: 'Policy_Rev_ID' })
    revision: PolicyRevision;
}