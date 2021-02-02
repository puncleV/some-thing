import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { Task, TasksStatus } from "./task.model";
import { CreateTaskDto } from "./dto/create-task.dto";

@Controller("tasks")
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getAllTasks(): Task[] {
    return this.tasksService.getAll();
  }

  @Get("/:id")
  getById(@Param("id") id: string): Task {
    return this.tasksService.getById(id);
  }

  @Post()
  create(@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksService.create(createTaskDto);
  }

  @Delete("/:id")
  deleteById(@Param("id") id: string): Task[] {
    return this.tasksService.deleteById(id);
  }

  @Patch("/:id/status")
  updateStatus(@Param("id") id: string, @Body("status") status: TasksStatus) {
    return this.tasksService.updateStatus(id, status);
  }
}
