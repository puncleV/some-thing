import { BadRequestException, PipeTransform } from "@nestjs/common";
import { TasksStatus } from "../task.model";

export class TaskStatusValidationPipe implements PipeTransform {
  readonly allowedStatuses = Object.values(TasksStatus);

  transform(value: any): any {
    if (!this.allowedStatuses.includes(value.toUpperCase())) {
      throw new BadRequestException(`Status "${value}" is not allowed`);
    }

    return value;
  }
}
