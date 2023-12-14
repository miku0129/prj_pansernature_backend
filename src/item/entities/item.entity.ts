import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Purchase } from 'src/user/entities/purchase';

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  detail: string;

  @Column()
  price: number;

  @Column()
  image_url: string;

  @OneToMany(() => Purchase, (purchase) => purchase.item)
  purchases: Purchase[];
}
