import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Review } from 'src/reviews/reviews.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'varchar' })
  password?: string;

  @Column({ type: 'boolean', default: () => false })
  admin: boolean;

  @OneToMany(
    () => Review,
    review => review.users,
  )
  reviews: Review[];
}
