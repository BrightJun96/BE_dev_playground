import { Module } from "@nestjs/common";
import { PrometheusModule as Prometheus } from "@willsoto/nestjs-prometheus";
import { MetricsController } from "./metrics.controller";
import { MetricsService } from "./metrics.service";

@Module({
  imports: [
    // 모니터링
    Prometheus.register({
      path: "metrics",
      // defaultMetrics: {
      //   // enabled: true, // 기본 메트릭 활성화
      // },
    }), // Prometheus 등록
  ],
  controllers: [MetricsController],
  providers: [MetricsService],
  exports: [MetricsService],
})
export class MetricsModule {}
