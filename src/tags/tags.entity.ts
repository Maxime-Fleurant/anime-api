import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, ManyToMany } from 'typeorm';
import { Theme } from 'src/themes/themes.entity';
import { Anime } from 'src/animes/animes.entity';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', unique: true })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'bigint' })
  themeId: number;

  @ManyToOne(
    () => Theme,
    theme => theme.tags,
  )
  @JoinColumn({ name: 'themeId' })
  theme: Theme;

  @ManyToMany(
    () => Anime,
    anime => anime.tags,
  )
  animes: Anime[];
}
