import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  Timestamp,
} from 'typeorm';
import { Membership } from 'src/memberships/entities/membership.entity';
import { Purchase } from 'src/purchases/entities/purchase.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column('varchar', { length: 30 })
  name: string;

  @Column('varchar', { length: 30 })
  firstname: string;

  @Column('varchar', { length: 100 })
  address: string;

  @Column('varchar', { length: 20 })
  postalcode: string;

  @Column('varchar', { length: 50 })
  email: string;

  @Column('boolean', { default: true })
  is_valid: boolean;

  @CreateDateColumn()
  readonly created_date?: Timestamp;

  @UpdateDateColumn()
  readonly updated_date?: Timestamp;

  @OneToMany(() => Membership, (membership) => membership.user)
  memberships: Membership[];

  @OneToMany(() => Purchase, (purchase) => purchase.user)
  purchases: Purchase[];
}
