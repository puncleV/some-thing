import * as _ from "lodash";
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { TaskStatus } from "./types";
import { CreateTaskDto } from "./dto/create-task.dto";
import { TaskStatusValidationPipe } from "./pipes/task-status-validation.pipe";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";
import { Task } from "./task.entity";
import { DeleteResult } from "typeorm";

@Controller("tasks")
export class TasksController {
  constructor(private tasksService: TasksService) {}

  // @Get()
  // @UsePipes(ValidationPipe)
  // getAllTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
  //   if (_.isEmpty(filterDto)) {
  //     return this.tasksService.getAll();
  //   } else {
  //     return this.tasksService.getWithFilters(filterDto);
  //   }
  // }
  //
  @Get("/:id")
  async getById(@Param("id", ParseIntPipe) id: number): Promise<Task> {
    return this.tasksService.getById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  async create(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.create(createTaskDto);
  }

  @Delete("/:id")
  async deleteById(@Param("id", ParseIntPipe) id: number) {
    await this.tasksService.deleteById(id);
  }
  //
  // @Patch("/:id/status")
  // updateStatus(@Param("id") id: string, @Body("status", TaskStatusValidationPipe) status: TaskStatus) {
  //   return this.tasksService.updateStatus(id, status);
  // }
}
