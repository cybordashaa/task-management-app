import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './task.entity';
import * as uuid from 'uuid/v1';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-task-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskRepository } from './task.repository';
import { TasksStatus } from './tasks-status.enum';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}

  async getTaskById(id: number): Promise<Task> {
    const found = await this.taskRepository.findOne(id);

    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    return found;
  }
  async createTask(createTaskDto: CreateTaskDto): Promise<Task>{
     
     return this.taskRepository.createTask(createTaskDto);
  }
  async deleteTask(id: number): Promise<void>{

    const result = await this.taskRepository.delete(id);
    console.log(result);
    
    

  }
}
