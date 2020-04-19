import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Studio } from 'src/studios/studios.entity';
import { Tag } from 'src/tags/tags.entity';
import { Genre } from 'src/genres/genres.entity';
import { Review } from 'src/reviews/reviews.entity';
import { Character } from 'src/characters/character.entity';
import { ExternalLink } from 'src/external-links/external-links.entity';

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

  @Column({ type: 'varchar', nullable: true })
  xLargeCover: string;

  @Column({ type: 'varchar', nullable: true })
  largeCover: string;

  @Column({ type: 'varchar', nullable: true })
  mediumCover: string;

  @Column({ type: 'smallint' })
  avgScore: number;

  @Column({ type: 'int' })
  popularity: number;

  @Column({ type: 'bigint', nullable: true })
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
    { nullable: true },
  )
  @JoinTable()
  tags: Tag[];

  @ManyToMany(
    () => Genre,
    genre => genre.animes,
  )
  @JoinTable()
  genres: Tag[];

  @OneToMany(
    () => Review,
    review => review.anime,
  )
  reviews: Review[];

  @OneToMany(
    () => Character,
    character => character.anime,
  )
  characters: Character[];

  @OneToMany(
    () => ExternalLink,
    externalLink => externalLink.animes,
  )
  externalLinks: ExternalLink[];
}
