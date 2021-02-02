import * as uuid from "uuid";

import { Injectable, NotFoundException } from "@nestjs/common";
import { Task, TasksStatus } from "./task.model";
import { CreateTaskDto } from "./dto/create-task.dto";

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
