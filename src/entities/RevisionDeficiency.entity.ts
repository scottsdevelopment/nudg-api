import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinTable, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { PolicyRevision } from './PolicyRevision.entity';

@Entity('POAM_def_tbl')
export class RevisionDeficiency {
    @PrimaryGeneratedColumn({ name: 'POAM_def_ID' })
    id: number;

    @Column({ name: 'Deficiency Name' })
    name: string;

    @Column({ name: 'Deficiency Description' })
    description: string;

    @Column({ name: 'Detection Date' })
    dateDetection: Date;

    @Column({ name: 'Detection Source' })
    source: string;

    @Column({ name: 'Status Date' })
    dateStatus: Date;

    @Column({ name: 'Status' })
    status: string;

    @Column({ name: 'Total Milestones' })
    totalMilestones: number;

    @Column({ name: 'Policy_Rev_ID' })
    revisionId: number;

    @ManyToOne(type => PolicyRevision, revision => revision.id)
    @JoinColumn({ name: 'Policy_Rev_ID' })
    revision: PolicyRevision;
}