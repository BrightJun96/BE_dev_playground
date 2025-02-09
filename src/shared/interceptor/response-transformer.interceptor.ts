import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { map, Observable } from "rxjs";

export interface Response<T> {
  data: T;
}
// 커스텀 응답 변환
@Injectable()
export class ResponseTransformerInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const request = context.switchToHttp().getRequest();

    // 특정 경로(/metrics)에서는 인터셉터 적용하지 않음
    if (request.url.startsWith("/metrics")) {
      return next.handle(); // 원본 데이터 그대로 반환
    }
    return next.handle().pipe(map((data) => ({ data })));
  }
}
