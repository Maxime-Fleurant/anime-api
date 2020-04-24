import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Anime } from 'src/animes/animes.entity';
import { User } from 'src/users/users.entity';

@Entity()
export class Review {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'smallint' })
  score: number;

  @Column({ type: 'text' })
  summary: string;

  @Column({ type: 'text' })
  body: string;

  @Column('bigint', { nullable: false })
  animeId: number;

  @Column('bigint', { nullable: false })
  userId: number;

  @ManyToOne(
    () => User,
    user => user.reviews,
  )
  @JoinColumn({ name: 'userId' })
  users: User[];

  @ManyToOne(
    () => Anime,
    anime => anime.reviews,
  )
  @JoinColumn({ name: 'animeId' })
  anime: Anime[];
}
