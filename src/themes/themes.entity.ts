import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Tag } from '../tags/tags.entity';

@Entity()
export class Theme {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', unique: true })
  name: string;

  @OneToMany(
    () => Tag,
    anime => anime.theme,
  )
  tags: Tag[];
}
