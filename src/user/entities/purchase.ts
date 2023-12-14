import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Item } from 'src/item/entities/item.entity';

@Entity()
export class Purchase {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  purchased_date: Date;

  @Column()
  is_ebook: boolean;

  @ManyToOne(() => User, (user) => user.purchases)
  user: User;

  @ManyToOne(() => Item, (item) => item.purchases)
  item: Item;
}
