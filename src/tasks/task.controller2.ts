import {
  Controller,
  Get,
  Post,
  Body,
  Logger,
  Param,
  Delete,
  Patch,
  Query,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { TasksService } from './task.service2';
import { Task, TasksStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-task-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipes';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  // haih heseg
  getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto): Task[] {
    //console.log(filterDto);

    if (Object.keys(filterDto).length) {
      return this.tasksService.getTasksWithFilters(filterDto);
    } else {
      return this.tasksService.getAllTasks();
    }
  }
  // getAllTasks(): Task[] {
  //   return this.tasksService.getAllTasks();
  // }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  //   createTask(@Body() body) {
  //     console.log('body', body);
  //   }
  //   createTask(
  //     @Body('title') title: string,
  //     @Body('description') description: string,
  //   ): Task {
  //     // console.log('title', title);
  //     // console.log('description', description);

  //     return this.tasksService.createTask(title, description);
  //   }

  // use a dto
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksService.createTask(createTaskDto);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string): void {
    this.tasksService.deleteTask(id);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body('status', TaskStatusValidationPipe) status: TasksStatus,
  ): Task {
    return this.tasksService.updateTaskStatus(id, status);
  }
}
