import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "api",
  password: "apipassword",
  autoLoadEntities: true,
  synchronize: true,
  database: "task-management-db",
};
