import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable, JoinColumn } from 'typeorm';
import { Studio } from 'src/studios/studios.entity';
import { Tag } from 'src/tags/tags.entity';

@Entity()
export class Anime {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', unique: true })
  romajiTitle: string;

  @Column({ type: 'varchar' })
  englishTitle: string;

  @Column({ type: 'varchar' })
  nativeTitle: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'date' })
  startDate: Date;

  @Column({ type: 'date' })
  endDate: Date;

  @Column({ type: 'smallint' })
  nbEpisodes: number;

  @Column({ type: 'varchar' })
  trailer: string;

  @Column({ type: 'varchar' })
  xLargeCover: string;

  @Column({ type: 'varchar' })
  largeCover: string;

  @Column({ type: 'varchar' })
  mediumCover: string;

  @Column({ type: 'smallint' })
  avgScore: number;

  @Column({ type: 'int' })
  popularity: number;

  @Column({ type: 'bigint' })
  studioId: number;

  @ManyToOne(
    () => Studio,
    studio => studio.animes,
  )
  @JoinColumn({ name: 'studioId' })
  studio: Studio;

  @ManyToMany(
    () => Tag,
    tag => tag.animes,
  )
  @JoinTable()
  tags: Tag[];
}
