import {
  CanActivate,
  ExecutionContext,
  Injectable,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { AUTH_CONST } from "../const/auth";
import { Public } from "../decorator/public.decorator";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.get(
      Public,
      context.getHandler(),
    );

    if (isPublic) return true;
    // 요청에서 req.user 확인
    const request = context.switchToHttp().getRequest();

    /**
     * request가 reissue-accessToken인 경우
     * user 정보가 없거나 request가 reissue-accessToken일 때, token type이 refresh가 아닐 때
     */

    if (request.path === "/auth/reissue-accessToken") {
      if (
        !request.user ||
        request.user.type !== AUTH_CONST.REFRESH_TOKEN
      ) {
        return false;
      }

      return true;
    }

    // request에 user 정보가 없거나 token type이 access가 아닐시 403
    if (
      !request.user ||
      request.user.type !== AUTH_CONST.ACCESS_TOKEN
    ) {
      return false; // return 403
    }
    return true;
  }
}
