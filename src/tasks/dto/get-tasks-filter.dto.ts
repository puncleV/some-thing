import { IsEnum, IsNotEmpty, IsOptional } from "class-validator";
import { TaskStatus } from "../types";

export class GetTasksFilterDto {
  @IsOptional()
  @IsEnum(TaskStatus)
  status: TaskStatus;

  @IsOptional()
  @IsNotEmpty()
  search: string;
}
