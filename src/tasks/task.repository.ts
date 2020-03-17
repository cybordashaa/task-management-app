import { Task } from './task.entity';
import { EntityRepository, Repository } from 'typeorm';
import { TasksStatus } from './tasks-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-task-filter.dto';
import {User} from "../auth/user.entity";
@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    const { status, search } = filterDto;
    const query = this.createQueryBuilder('task');
    if(status){
      query.andWhere('task.status = :status', { status});
    }

    if (search){
      query.andWhere('(task.title LIKE :search OR task.description LIKE :search)', { search: `%${search}`});
    }

    const task = await query.getMany();

    return task;
  }
  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const { title, description } = createTaskDto;

    const task = new Task();

    task.title = title;
    task.description = description;
    task.status = TasksStatus.OPEN;
    task.user = user;

    await task.save();

    return task;
  }
}
