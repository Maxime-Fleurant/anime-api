import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Genre {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', unique: true })
  name: string;
}
