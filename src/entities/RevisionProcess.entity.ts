import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinTable, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { PolicyRevision } from './PolicyRevision.entity';

@Entity('Process_map_step_tbl')
export class RevisionProcess {
    @PrimaryGeneratedColumn({ name: 'Process map step ID' })
    id: number;

    @Column({ name: 'Procedure' })
    procedure: string;

    @Column({ name: 'Description' })
    description: string;

    @Column({ name: 'Status' })
    status: string;

    @Column({ name: 'Hyperlink' })
    hyperlink: string;

    @ManyToOne(type => PolicyRevision, revision => revision.id)
    @JoinColumn({ name: 'Policy_Rev_ID' })
    revision: PolicyRevision;
}