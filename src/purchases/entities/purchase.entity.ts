import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  Timestamp,
  JoinColumn,
  Column,
} from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Item } from 'src/items/entities/item.entity';

@Entity()
export class Purchase {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  readonly purchased_date?: Timestamp;

  @Column('varchar', { length: 100 })
  delivery_address?: string;

  @Column('varchar', { length: 20 })
  delivery_postalcode?: string;

  @Column('boolean', { default: true })
  is_valid: boolean;

  @ManyToOne(() => User, (user) => user.purchases, { eager: true })
  @JoinColumn()
  user: User;

  @ManyToOne(() => Item, (item) => item.purchases, { eager: true })
  @JoinColumn()
  item: Item;
}
