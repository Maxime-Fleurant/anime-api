import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Theme {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', unique: true })
  name: string;
}
