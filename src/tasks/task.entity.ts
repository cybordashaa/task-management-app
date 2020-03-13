import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { TasksStatus } from './tasks-status.enum';

@Entity()
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: TasksStatus;
}
