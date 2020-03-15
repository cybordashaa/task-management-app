import { Task } from './task.entity';
import { EntityRepository, Repository } from 'typeorm';
import { TasksStatus } from './tasks-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        const { title, description}  = createTaskDto;
    
    const task  = new Task();

    task.title = title;
    task.description = description;
    task.status = TasksStatus.OPEN;

    await task.save();
      
    return task;

    }
}
