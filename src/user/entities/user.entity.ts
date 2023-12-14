import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Membership } from './membership';
import { Purchase } from './purchase';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  firstname: string;

  @Column()
  address: string;

  @Column()
  postalcode: string;

  @Column()
  email: string;

  @Column()
  is_valid: boolean;

  @OneToMany(() => Membership, (membership) => membership.user)
  memberships: Membership[];

  @OneToMany(() => Purchase, (purchase) => purchase.user)
  purchases: Purchase[];
}
