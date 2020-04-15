import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Anime } from 'src/animes/animes.entity';

@Entity()
export class Character {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'varchar' })
  firstName: string;

  @Column({ type: 'varchar' })
  lastName: string;

  @Column({ type: 'varchar' })
  nativeName: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'varchar', nullable: true })
  nativeImage: string;

  @Column({ type: 'varchar', nullable: true })
  largeImage: string;

  @Column({ type: 'varchar', nullable: true })
  mediumImage: string;

  @Column({ type: 'bigint' })
  animeId: number;

  @ManyToOne(
    () => Anime,
    anime => anime.characters,
  )
  @JoinColumn({ name: 'animeId' })
  anime: Anime;
}
