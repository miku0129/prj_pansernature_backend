import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  Timestamp,
  JoinColumn,
} from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Item } from 'src/items/entities/item.entity';

@Entity()
export class Purchase {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  readonly purchased_date?: Timestamp;

  @ManyToOne(() => User, (user) => user.purchases, { eager: true })
  @JoinColumn()
  user: User;

  @ManyToOne(() => Item, (item) => item.purchases, { eager: true })
  @JoinColumn()
  item: Item;
}
