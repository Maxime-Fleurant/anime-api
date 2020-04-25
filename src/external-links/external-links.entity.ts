import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Anime } from '../animes/animes.entity';

@Entity()
export class ExternalLink {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'varchar' })
  site: string;

  @Column({ type: 'varchar' })
  url: string;

  @Column({ type: 'bigint' })
  animeId: number;

  @ManyToOne(
    () => Anime,
    anime => anime.externalLinks,
  )
  @JoinColumn({ name: 'animeId' })
  animes: Anime[];
}
