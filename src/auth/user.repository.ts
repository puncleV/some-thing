import { EntityRepository, Repository } from "typeorm";
import { User } from "./user.entity";
import { AuthCredentialsDto } from "./dto/auth.credentials.dto";
import { ConflictException, InternalServerErrorException } from "@nestjs/common";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  // todo refactor, i guess
  async createUser(authCredentialsDto: AuthCredentialsDto, salt: string) {
    const user = this.create({ ...authCredentialsDto, salt });

    try {
      await user.save();
    } catch (e) {
      switch (e.code) {
        case "23505": // on duplicate
          throw new ConflictException("Username already exists");
        default:
          throw new InternalServerErrorException();
      }
    }
  }
}
