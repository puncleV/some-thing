import { BadRequestException, PipeTransform } from "@nestjs/common";
import { TaskStatus } from "../types";

export class TaskStatusValidationPipe implements PipeTransform {
  readonly allowedStatuses = Object.values(TaskStatus);

  transform(value: any): any {
    if (!this.allowedStatuses.includes(value.toUpperCase())) {
      throw new BadRequestException(`Status "${value}" is not allowed`);
    }

    return value;
  }
}
