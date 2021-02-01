import * as uuid from "uuid";
import { Injectable } from "@nestjs/common";
import { Task, TasksStatus } from "./task.model";
import { CreateTaskDto } from "./dto/create-task.dto";

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

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
}
