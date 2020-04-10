import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Theme } from 'src/themes/themes.entity';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', unique: true })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @ManyToOne(() => Theme)
  @JoinColumn()
  theme: Theme;
}
