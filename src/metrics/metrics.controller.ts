import { Controller, Get, Header } from "@nestjs/common";
import { Public } from "../domain/auth/decorator/public.decorator";
import { MetricsService } from "./metrics.service";

@Controller("metrics")
export class MetricsController {
  constructor(
    private readonly metricsService: MetricsService,
  ) {}

  // 수집한 메트릭 controller에 등록
  // prometheus에서 메트릭 수집할 때 prometheus가 바라는 metric 데이터 포맷에 맞게 주어야함
  // 그래야 prometheus에서 메트릭 수집이 가능하다.
  @Get()
  @Public()
  @Header("Content-Type", "text/plain")
  async getMetrics(): Promise<string> {
    return await this.metricsService.getMetrics();
  }
}
