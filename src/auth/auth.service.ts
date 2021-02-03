import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from "bcrypt";

import { UserRepository } from "./user.repository";
import { AuthCredentialsDto } from "./dto/auth.credentials.dto";
import { User } from "./user.entity";
@Injectable()
export class AuthService {
  constructor(@InjectRepository(UserRepository) private userRepository: UserRepository) {}

  async signUp({ username, password }: AuthCredentialsDto) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await this.hashPassword(password, salt);

    return this.userRepository.createUser(
      {
        username,
        password: hashedPassword,
      },
      salt,
    );
  }

  async signIn({ username, password }: AuthCredentialsDto) {
    const user = await this.userRepository.findOne({ username: username });

    if (!user) {
      throw new NotFoundException(`Can't find a user with id: ${username}`);
    }

    if (!(await this.validatePassword(user, password))) {
      throw new NotFoundException(`Can't find a user with passed username and password`);
    }

    return username;
  }

  private async validatePassword(user: User, password: string) {
    const hashedPassword = await this.hashPassword(password, user.salt);

    return hashedPassword === user.password;
  }

  private async hashPassword(rawPassword: string, salt: string) {
    return await bcrypt.hash(rawPassword, salt);
  }
}
