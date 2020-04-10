import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Studio {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', unique: true })
  name: string;
}
