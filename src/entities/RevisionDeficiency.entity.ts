import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinTable, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { PolicyRevision } from './PolicyRevision.entity';

@Entity('POAM_def_tbl')
export class RevisionDeficiency {
    @PrimaryGeneratedColumn({ name: 'POAM_def_ID' })
    id: number;

    @Column({ name: 'Policy_Rev_ID' })
    revisionId: number;

    @ManyToOne(type => PolicyRevision, revision => revision.id)
    @JoinColumn({ name: 'Policy_Rev_ID' })
    revision: PolicyRevision;

    @Column({ name: 'Deficiency Name' })
    name: string;

    @Column({ name: 'Deficiency Description' })
    description: string;

    @Column({ name: 'Detection Source' })
    source: string;

    @Column({ name: 'Weakness Source Identifier' })
    weaknessSourceIdentifier: string;

    @Column({ name: 'Asset Name (Identifier)' })
    assetNameId: number;
    
    @Column({ name: 'Point of Contact'})
    pointOfContact: string;

    @Column({ name: 'Resources Required'})
    resoucesRequired: string;

    @Column({ name: 'Resource Estimate'})
    resourceEstimate: string;

    @Column({ name: 'Overall Remediation Plan'})
    plan: string;

    @Column({ name: 'Detection Date' })
    dateDetection: Date;

    @Column({ name: 'Scheduled Completion Date'})
    dateScheduleCompletion: Date;
    
    @Column({ name: 'Status Date' })
    dateStatus: Date;

    @Column({ name: 'Status' })
    status: string;

    @Column({ name: 'Vendor Dependency'})
    vendorDependency: boolean;

    @Column({ name: 'Last Vendor Check-in Date'})
    dateLastVendorCheckin: Date;

    @Column({ name: 'Vendor Dependent Product Name'})
    vendorDependentProductName: string;

    @Column({ name: 'Original Risk Rating'})
    originalRiskRating: string;

    @Column({ name: 'Adjusted Risk Rating'})
    adjustedRiskRating: string;

    @Column({ name: 'Risk Adjustment'})
    riskAdjustment: boolean;

    @Column({ name: 'Risk Adjustment Deviation Rationale'})
    riskAdjustmentDeviationRationale: string;

    @Column({ name: 'False Positive'})
    falsePositive: boolean;

    @Column({ name: 'Operational Requirement'})
    operationalRequirement: boolean;

    @Column({ name: 'Operational Requirement Deviation Rationale'})
    operationalRequirementDeviaitonRationale: string;

    @Column({ name: 'Comments'})
    comments: string;

    @Column({ name: 'Total Milestones' })
    totalMilestones: number;
}