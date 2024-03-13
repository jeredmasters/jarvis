import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { ForeignKey } from '../util/foreign-key';
import { Device } from './device.entity';

export enum MEASURE_TYPE {
  TEMP = "TEMP",
  HUMIDITY = "HUMIDITY"
}

@Entity()
export class Measure extends BaseEntity {

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ForeignKey(Device)
  device_id: string;

  @Column()
  type: MEASURE_TYPE;

  @Column({ type: 'float' })
  value: number;

  @Column({ type: 'jsonb', nullable: true })
  meta?: any;
}
