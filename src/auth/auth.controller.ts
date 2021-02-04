import { Body, Controller, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { AuthCredentialsDto } from "./dto/auth.credentials.dto";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("/signup")
  @UsePipes(ValidationPipe)
  signUp(@Body() authCredentialsDto: AuthCredentialsDto) {
    return this.authService.signUp(authCredentialsDto);
  }

  @Post("/signin")
  @UsePipes(ValidationPipe)
  async signIn(@Body() authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
    return await this.authService.signIn(authCredentialsDto);
  }
}
