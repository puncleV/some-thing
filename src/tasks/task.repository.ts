import { EntityRepository, Repository } from "typeorm";
import { Task } from "./task.entity";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async get({ status, search }: GetTasksFilterDto): Promise<Task[]> {
    const query = this.createQueryBuilder("task");

    if (status) {
      query.andWhere("task.status = :status", { status });
    }

    if (search) {
      query.andWhere("task.title like :search or task.description like :search", { search: `%${search}%` });
    }

    return await query.getMany();
  }
}
