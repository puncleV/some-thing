import * as uuid from "uuid";

import { Injectable, NotFoundException } from "@nestjs/common";
import { Task, TasksStatus } from "./task.model";
import { CreateTaskDto } from "./dto/create-task.dto";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getById(id: string): Task {
    const task = this.tasks.find((t) => t.id === id);

    if (!task) {
      throw new NotFoundException(`Cant find task with id: ${id}`);
    }

    return task;
  }

  getAll(): Task[] {
    return this.tasks;
  }

  getWithFilters(filterDto: GetTasksFilterDto): Task[] {
    let tasks = [];

    if (filterDto.status) {
      tasks = this.tasks.filter((t) => t.status === filterDto.status);
    }

    if (filterDto.search) {
      tasks = [
        ...tasks,
        ...this.tasks.filter((t) => t.title.includes(filterDto.search) || t.description.includes(filterDto.search)),
      ];
    }

    return tasks;
  }

  create(createTaskDto: CreateTaskDto) {
    const task: Task = {
      id: uuid.v4(),
      status: TasksStatus.OPEN,
      ...createTaskDto,
    };

    this.tasks.push(task);

    return task;
  }

  deleteById(id: string): Task[] {
    const task = this.getById(id);

    this.tasks = this.tasks.filter((t) => t.id !== task.id);

    return this.tasks;
  }

  updateStatus(id: string, status: TasksStatus) {
    const task = this.getById(id);

    task.status = status;

    return task;
  }
}
