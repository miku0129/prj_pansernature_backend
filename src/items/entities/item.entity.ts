import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  Timestamp,
} from 'typeorm';
import { Purchase } from 'src/users/entities/purchase.entity';

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column('varchar', { length: 50 })
  title: string;

  @Column('varchar', { length: 500, nullable: true })
  detail: string;

  @Column('int')
  price: number;

  @Column('varchar', { length: 100 })
  image_url: string;

  @CreateDateColumn()
  readonly created_date?: Timestamp;

  @UpdateDateColumn()
  readonly updated_date?: Timestamp;

  @OneToMany(() => Purchase, (purchase) => purchase.item)
  purchases: Purchase[];
}
