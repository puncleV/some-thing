import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from "bcrypt";

import { UserRepository } from "./user.repository";
import { AuthCredentialsDto } from "./dto/auth.credentials.dto";
import { User } from "./user.entity";
import { JwtService } from "@nestjs/jwt";
import { IJwtPayload } from "./jwt-payload.interface";
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

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

  async signIn({ username, password }: AuthCredentialsDto): Promise<{ accessToken: string }> {
    const user = await this.userRepository.findOne({ username: username });

    if (!user) {
      throw new NotFoundException(`Can't find a user with id: ${username}`);
    }

    if (!(await this.validatePassword(user, password))) {
      throw new UnauthorizedException(`Invalid credentials`);
    }

    const payload: IJwtPayload = { username };
    const accessToken = await this.jwtService.sign(payload);

    return { accessToken };
  }

  private async validatePassword(user: User, password: string) {
    const hashedPassword = await this.hashPassword(password, user.salt);

    return hashedPassword === user.password;
  }

  private async hashPassword(rawPassword: string, salt: string) {
    return await bcrypt.hash(rawPassword, salt);
  }
}
