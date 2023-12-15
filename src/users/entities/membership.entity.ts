import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  Timestamp,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Membership {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  readonly created_date?: Timestamp;

  @Column('date')
  end_date: Date;

  @Column('boolean', { default: true })
  is_valid: boolean;

  @ManyToOne(() => User, (user) => user.memberships)
  user: User;
}
