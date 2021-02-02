import * as uuid from "uuid";
import { Injectable } from "@nestjs/common";
import { Task, TasksStatus } from "./task.model";
import { CreateTaskDto } from "./dto/create-task.dto";

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getById(id: Task["id"]): Task {
    const task = this.tasks.find((t) => t.id === id);

    if (!task) {
      throw new Error(`Cant find task with id: ${id}`);
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

  deleteById(id: Task["id"]): Task[] {
    this.tasks = this.tasks.filter((t) => t.id !== id);

    return this.tasks;
  }

  updateStatus(id: Task["id"], status: TasksStatus) {
    const task = this.getById(id);

    task.status = status;

    return task;
  }
}
