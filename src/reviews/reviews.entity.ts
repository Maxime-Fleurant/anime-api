import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Anime } from 'src/animes/animes.entity';

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

  @ManyToOne(
    () => Anime,
    anime => anime.reviews,
  )
  @JoinColumn({ name: 'animeId' })
  anime: Anime[];
}
