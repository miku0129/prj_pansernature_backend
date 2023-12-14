import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  Timestamp,
} from 'typeorm';
import { User } from './user.entity';
// import { Item } from 'src/item/entities/item.entity';

@Entity()
export class Purchase {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  readonly purchased_date?: Timestamp;

  @Column('boolean', { default: false })
  is_ebook: boolean;

  @ManyToOne(() => User, (user) => user.purchases)
  user: User;

  // @ManyToOne(() => Item, (item) => item.purchases)
  // item: Item;
}
