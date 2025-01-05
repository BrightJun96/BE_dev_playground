import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Headers,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { JwtAuthGuard } from "./strategy/jwt.strategy";
import { LocalAuthGuard } from "./strategy/local.strategy";

@Controller("auth")
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  registerUser(@Headers("authorization") token: string) {
    return this.authService.register(token);
  }

  @Post("login")
  loginUser(@Headers("authorization") token: string) {
    return this.authService.login(token);
  }

  @Post("reissue-accessToken")
  async rotateAccessToken(
    @Headers("authorization") refreshToken: string,
  ) {
    const payload = await this.authService.parseBearerToken(
      refreshToken,
      true,
    );

    return {
      accessToken: await this.authService.issueToken(
        payload,
        false,
      ),
    };
  }
  @UseGuards(LocalAuthGuard)
  @Post("login/passport")
  // local.strategy.ts 파일의 validate() 메서드에서 반환한 객체가 Request 객체로 전달됨
  async loginUserPassport(@Request() req) {
    return {
      accessToken: await this.authService.issueToken(
        req.user,
        false,
      ),
      refreshToken: await this.authService.issueToken(
        req.user,
        true,
      ),
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get("private")
  async privateRequest(@Request() req) {
    return req.user;
  }
}
