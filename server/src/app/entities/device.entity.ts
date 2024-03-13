import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { ForeignKey } from '../util/foreign-key';
import { Room } from './room.entity';

export enum DEVICE_TYPE {
  AIRCON = "AIRCON",
  LED = "LED"
}

export enum DEVICE_PROTOCOL {
  SENSIBO = "SENSIBO",
  ARDUINO = "ARDUINO"
}

@Entity()
export class Device extends BaseEntity {

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column()
  type: DEVICE_TYPE;

  @ForeignKey(Room)
  room_id: string;

  @Column()
  label: string;

  @Column()
  protocol: DEVICE_PROTOCOL;

  @Column()
  uri: string;

  @Column({ nullable: true })
  api_key?: string;

  @Column({ type: 'jsonb', nullable: true })
  meta?: any
}
