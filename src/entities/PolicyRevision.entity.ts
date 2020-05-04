import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinTable, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { Policy } from './Policy.entity';
import { PolicyProcedure } from './PolicyProcedure.entity';
import { PolicyObjective } from './PolicyObjective.entity';
import { ProcedureControl } from './ProcedureControl.entity';
import { RevisionDeficiency } from './RevisionDeficiency.entity';
import { RevisionProcess } from './RevisionProcess.entity';

@Entity('Policy_revision_tbl')
export class PolicyRevision {
    @PrimaryGeneratedColumn({ name: 'Policy_Rev_ID' })
    id: number;

    @Column({ name: 'Policy Sort Order' })
    sort: number;

    @Column({ name: 'Policy Number' })
    number: string;

    @Column({ name: 'Policy Status' })
    status: string;

    @OneToOne(type => PolicyObjective, objective => objective.revision)
    objective: PolicyObjective;

    @OneToOne(type => PolicyProcedure, procedure => procedure.revision)
    procedure: PolicyProcedure;

    @OneToOne(type => ProcedureControl, control => control.revision)
    procedureControl: ProcedureControl;

    @OneToMany(type => RevisionDeficiency, deficiency => deficiency.revision)
    deficiencies: RevisionDeficiency[];

    @OneToMany(type => RevisionProcess, process => process.revision)
    processes: RevisionProcess[];

    @ManyToOne(type => Policy, policy => policy.revisions)
    @JoinColumn({ name: "Policy_ID" })
    policy: Policy;
}