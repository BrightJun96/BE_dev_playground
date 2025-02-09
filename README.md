## Description

https://thedevlounge.com API 서버입니다.

## Documentation(Swagger)

- https://api.main.thedevlounge.com/doc

# Deployment(github action flow)
1. 앱 도커이미지 빌드 후 도커헙 푸시
2. EC2에서 푸시된 도커 이미지 pull
3. 앱+prometheus+grafana => docker compose로 실행

## Monitoring
- Prometheus + Grafana

## Tech
### Framework
- Nest.js

### Language
- Typescript

### ORM
- TypeOrm
- Mongoose
  
### DB
- PostgreSQL on AWS RDB
- MongoDB on mongo cluster

### Redis
- Cacheing



## Run project in local environment

> 실행해보고 싶다면 .env 파일 구성해야함.

```bash

# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

