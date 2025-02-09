import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  OnModuleInit,
} from "@nestjs/common";
import { Counter, Gauge, Histogram } from "prom-client";
import { catchError, Observable, tap } from "rxjs";
import { MetricsService } from "./metrics.service";

@Injectable()
export class MetricsInterceptor
  implements NestInterceptor, OnModuleInit
{
  // status code 2XX 요청 성공동안 걸리는 시간
  private readonly requestSuccessHistogram = new Histogram({
    name: "nestjs_success_requests",
    help: "NestJs success requests - duration in seconds",
    labelNames: [
      "handler",
      "controller",
      "method",
      "route",
    ],
    buckets: [
      0.0001, 0.001, 0.005, 0.01, 0.025, 0.05, 0.075, 0.09,
      0.1, 0.25, 0.5, 1, 2.5, 5, 10,
    ],
  });
  // status code != 2XX 실패 동안 걸리는 시간
  private readonly requestFailHistogram = new Histogram({
    name: "nestjs_fail_requests",
    help: "NestJs fail requests - duration in seconds",
    labelNames: [
      "handler",
      "controller",
      "method",
      "route",
    ],
    buckets: [
      0.0001, 0.001, 0.005, 0.01, 0.025, 0.05, 0.075, 0.09,
      0.1, 0.25, 0.5, 1, 2.5, 5, 10,
    ],
  });
  // 요청 실패 횟수
  private readonly failureCounter = new Counter({
    name: "nestjs_requests_failed_count",
    help: "NestJs requests that failed",
    labelNames: [
      "handler",
      "controller",
      "error",
      "route",
      "method",
    ],
  });

  constructor(
    private readonly metricsService: MetricsService,
  ) {}

  static registerServiceInfo(serviceInfo: {
    domain: string;
    name: string;
    version: string;
  }): MetricsInterceptor {
    new Gauge({
      name: "nestjs_info",
      help: "NestJs service version info",
      labelNames: ["domain", "name", "version"],
    }).set(
      {
        domain: serviceInfo.domain,
        name: `${serviceInfo.domain}.${serviceInfo.name}`,
        version: serviceInfo.version,
      },
      1,
    );

    return new MetricsInterceptor(new MetricsService());
  }

  // 초기화 각 수집 metrics 초기화
  onModuleInit() {
    this.requestSuccessHistogram.reset();
    this.requestFailHistogram.reset();
    this.failureCounter.reset();
  }

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> {
    const req = context.switchToHttp().getRequest();

    const originUrl = context
      .switchToHttp()
      .getRequest()
      .url.toString();

    const method = context
      .switchToHttp()
      .getRequest()
      .method.toString();

    // 요청 경로(route) 추가
    const route = req.route
      ? req.route.path
      : "unknown_route";
    const labels = {
      controller: context.getClass().name,
      handler: context.getHandler().name,
      method: method,
      route,
    };

    try {
      // 시간 재기위해 시간 시작!
      const requestSuccessTimer =
        this.requestSuccessHistogram.startTimer(labels);
      //실패시간 재기 위해 시간 시작!
      const requestFailTimer =
        this.requestFailHistogram.startTimer(labels);
      return next.handle().pipe(
        tap(() => {
          if (this.isAvailableMetricsUrl(originUrl)) {
            // 성공하면 성공시간 기록!
            this.metricsService.startSuccessTimer(labels);
            requestSuccessTimer();
          }
        }),
        catchError((err) => {
          if (this.isAvailableMetricsUrl(originUrl)) {
            // 실패하면 실패시간 기록
            this.metricsService.startFailTimer(labels);
            // 실패해서 request 실패 횟수 증가
            this.metricsService.incrementFailureCounter(
              labels,
            );
            requestFailTimer();
            this.failureCounter
              .labels({ ...labels })
              .inc(1);
          }
          throw err;
        }),
      );
    } catch (error) {}
  }

  // metrics가 포함된 url 요청은 수집하지 않는다.
  private isAvailableMetricsUrl(url: string): boolean {
    const excludePaths = "metrics";
    if (url.includes(excludePaths)) {
      return false;
    }
    return true;
  }
}
