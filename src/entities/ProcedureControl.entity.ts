import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinTable, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { PolicyRevision } from './PolicyRevision.entity';

@Entity('Procedure_control_tbl')
export class ProcedureControl {
    @PrimaryGeneratedColumn({ name: 'Procedure_control_ID' })
    id: number;

    @Column({ name: 'Control:' })
    control: string;

    @Column({ name: 'Procedure_roles:' })
    procedure: string;

    @OneToOne(type => PolicyRevision, revision => revision.procedureControl)
    @JoinColumn({ name: 'Policy_Rev_ID' })
    revision: PolicyRevision;
}