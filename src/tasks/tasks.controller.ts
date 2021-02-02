import * as _ from "lodash";
import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UsePipes, ValidationPipe } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { Task, TasksStatus } from "./task.model";
import { CreateTaskDto } from "./dto/create-task.dto";
import { TaskStatusValidationPipe } from "./pipes/task-status-validation.pipe";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";

@Controller("tasks")
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  @UsePipes(ValidationPipe)
  getAllTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
    if (_.isEmpty(filterDto)) {
      return this.tasksService.getAll();
    } else {
      return this.tasksService.getWithFilters(filterDto);
    }
  }

  @Get("/:id")
  getById(@Param("id") id: string): Task {
    return this.tasksService.getById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksService.create(createTaskDto);
  }

  @Delete("/:id")
  deleteById(@Param("id") id: string): Task[] {
    return this.tasksService.deleteById(id);
  }

  @Patch("/:id/status")
  updateStatus(@Param("id") id: string, @Body("status", TaskStatusValidationPipe) status: TasksStatus) {
    return this.tasksService.updateStatus(id, status);
  }
}
