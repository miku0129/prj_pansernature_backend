import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  Timestamp,
  JoinColumn,
} from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Entity()
export class Membership {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  readonly created_date?: Timestamp;

  @Column('date')
  end_date: Date;

  @Column('boolean', { default: false })
  is_valid: boolean;

  @ManyToOne(() => User, (user) => user.memberships, { eager: true })
  @JoinColumn()
  user: User;
}
