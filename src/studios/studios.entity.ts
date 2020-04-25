import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Anime } from '../animes/animes.entity';

@Entity()
export class Studio {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', unique: true })
  name: string;

  @OneToMany(
    () => Anime,
    anime => anime.studio,
  )
  animes: Anime[];
}
