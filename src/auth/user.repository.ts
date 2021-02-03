import { EntityRepository, Repository } from "typeorm";
import { User } from "./user";

@EntityRepository(User)
export class UserRepository extends Repository<User> {}
