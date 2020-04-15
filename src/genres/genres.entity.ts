import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { Anime } from 'src/animes/animes.entity';

@Entity()
export class Genre {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', unique: true })
  name: string;

  @ManyToMany(
    () => Anime,
    anime => anime.genres,
  )
  animes: Anime[];
}
