import { CacheModule } from "@nestjs/cache-manager";
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from "@nestjs/common";
import {
  ConditionalModule,
  ConfigModule,
  ConfigService,
} from "@nestjs/config";
import {
  APP_FILTER,
  APP_GUARD,
  APP_INTERCEPTOR,
} from "@nestjs/core";
import { MongooseModule } from "@nestjs/mongoose";
import { ScheduleModule } from "@nestjs/schedule";
import { ServeStaticModule } from "@nestjs/serve-static";
import { TypeOrmModule } from "@nestjs/typeorm";

import * as redisStore from "cache-manager-redis-store";
import * as Joi from "joi";
import { join } from "path";
import { AuthModule } from "./domain/auth/auth.module";
import { AuthGuard } from "./domain/auth/guard/auth.guard";
import { RbacGuard } from "./domain/auth/guard/rbac.guard";
import { BearerTokenMiddleware } from "./domain/auth/middleware/bearer-token.middleware";
import { ChatModule } from "./domain/chat/chat.module";
import { ChatRoom } from "./domain/chat/entities/chat-room.entity";
import { Chat } from "./domain/chat/entities/chat.entity";
import { ConceptMeta } from "./domain/concept/adapter/output/typeorm/entities/concept-meta.entity";
import { Concept } from "./domain/concept/adapter/output/typeorm/entities/concept.entity";
import { ConceptModule } from "./domain/concept/concept.module";
import { InterviewMetadata } from "./domain/interview/entities/interview-metadata.entity";
import { Interview } from "./domain/interview/entities/interview.entity";
import { InterviewModule } from "./domain/interview/interview.module";

import { MultipleChoice } from "./domain/quiz/adapter/output/typeorm/entities/multiple-choice.entity";
import { QuizMetaData } from "./domain/quiz/adapter/output/typeorm/entities/quiz-meta-data.entity";
import { Quiz } from "./domain/quiz/adapter/output/typeorm/entities/quiz.entity";
import { QuizModule } from "./domain/quiz/quiz.module";
import { RoadmapModule } from "./domain/roadmap/roadmap.module";
import { User } from "./domain/user/entities/user.entity";
import { UserModule } from "./domain/user/user.module";

import { FileUploadModule } from "./file-upload/file-upload.module";
import { MetricsInterceptor } from "./metrics/metrics.interceptor";
import { MetricsModule } from "./metrics/metrics.module";
import { envVariablesKeys } from "./shared/const/env.const";
import { QueryFailedFilter } from "./shared/filter/query-failed.filter";
import { ResponseTimeInterceptor } from "./shared/interceptor/response-time.interceptor";
import { ResponseTransformerInterceptor } from "./shared/interceptor/response-transformer.interceptor";
import { ThrottleInterceptor } from "./shared/interceptor/throttle.interceptor";
import { TransactionModule } from "./shared/transaction/transaction.module";
import { WorkerModule } from "./worker/worker.module";

@Module({
  imports: [
    MetricsModule,
    // 환경변수 설정
    ConfigModule.forRoot({
      // 어떤 파일에서든 process.env로 접근 가능토록 하는 설정
      isGlobal: true,
      envFilePath:
        // process.env.NODE_ENV === "test"
        //   ? "test.env"
        //   :
        ".env",
      validationSchema: Joi.object({
        ENV: Joi.string()
          .valid("test", "dev", "prod")
          .required(),
        DB_TYPE: Joi.string().valid("postgres").required(),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_DATABASE: Joi.string().required(),
        HASH_ROUNDS: Joi.number().required(),
        ACCESS_TOKEN_SECRET: Joi.string().required(),
        REFRESH_TOKEN_SECRET: Joi.string().required(),
        AWS_ACCESS_KEY_ID: Joi.string().required(),
        AWS_SECRET_ACCESS_KEY: Joi.string().required(),
        AWS_REGION: Joi.string().required(),
        BUCKET_NAME: Joi.string().required(),
        REDIS_HOST: Joi.string().required(),
        REDIS_PORT: Joi.number().required(),
        REDIS_PASSWORD: Joi.string().required(),
      }),
    }),

    // 몽고 DB
    MongooseModule.forRoot(process.env.MONGO_DB, {
      dbName: "dev-lounge",
    }),

    // TypeORM 설정
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: configService.get<string>(
          envVariablesKeys.DB_TYPE,
        ) as "postgres",
        host: configService.get<string>(
          envVariablesKeys.DB_HOST,
        ),
        port: configService.get<number>(
          envVariablesKeys.DB_PORT,
        ),
        username: configService.get<string>(
          envVariablesKeys.DB_USERNAME,
        ),
        password: configService.get<string>(
          envVariablesKeys.DB_PASSWORD,
        ),
        database: configService.get<string>(
          envVariablesKeys.DB_DATABASE,
        ),
        entities: [
          User,
          Chat,
          ChatRoom,
          Quiz,
          QuizMetaData,
          MultipleChoice,
          Interview,
          InterviewMetadata,
          Concept,
          ConceptMeta,
        ],
        synchronize: false,
        ssl: {
          rejectUnauthorized: false,
        },

        // logging: true,
      }),

      inject: [ConfigService],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), "public"),
      serveRoot: "/public/",
    }),
    AuthModule,
    UserModule,
    FileUploadModule,
    QuizModule,

    CacheModule.register({
      store: redisStore,
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      password: process.env.REDIS_PASSWORD,
      ttl: 10, // 초단위로 적용
      isGlobal: true,
    }),

    ScheduleModule.forRoot(),
    ChatModule,
    ConditionalModule.registerWhen(
      WorkerModule,
      (env: NodeJS.ProcessEnv) => env["TYPE"] === "worker",
    ),
    // CodeModule,
    InterviewModule,
    ConceptModule,
    RoadmapModule,
    TransactionModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RbacGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseTimeInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseTransformerInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: QueryFailedFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ThrottleInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: MetricsInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(BearerTokenMiddleware)
      .exclude(
        {
          path: "/auth/login",
          method: RequestMethod.POST,
        },
        {
          path: "/auth/register",
          method: RequestMethod.POST,
        },
      )
      .forRoutes("*");
  }
}
