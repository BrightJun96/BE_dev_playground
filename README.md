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


## Run project in local environment

```bash
#도커 사용시(로컬 DB 따로 구성하지 않아도 됨.)
$ docker compose up --build

# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

