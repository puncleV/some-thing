import { Injectable, NotFoundException } from "@nestjs/common";
import { TaskStatus } from "./types";
import { CreateTaskDto } from "./dto/create-task.dto";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";
import { TaskRepository } from "./task.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { Task } from "./task.entity";

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}

  async get(filter?: GetTasksFilterDto): Promise<Task[]> {
    return await this.taskRepository.get(filter);
  }

  async getById(id: number): Promise<Task> {
    const task = await this.taskRepository.findOne(id);

    if (task == null) {
      throw new NotFoundException(`No tasks with id: "${id}"`);
    }

    return task;
  }

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const newTask = this.taskRepository.create(createTaskDto);

    return newTask.save();
  }

  async deleteById(id: number): Promise<void> {
    const result = await this.taskRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`No tasks with id: "${id}"`);
    }
  }

  async updateStatus(id: number, status: TaskStatus) {
    const result = await this.taskRepository.update(id, { status });

    if (result.affected === 0) {
      throw new NotFoundException(`No tasks with id: "${id}"`);
    }

    return result.raw;
  }
}
