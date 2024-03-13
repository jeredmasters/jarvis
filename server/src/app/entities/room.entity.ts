import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { ForeignKey } from '../util/foreign-key';
import { Device } from './device.entity';

export enum MEASURE_TYPE {
  TEMP = "TEMP",
  HUMIDITY = "HUMIDITY"
}

@Entity()
export class Room extends BaseEntity {

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ nullable: true })
  reference?: string;

  @Column()
  label: string;

  @Column({ type: 'jsonb', nullable: true })
  meta?: any;
}
