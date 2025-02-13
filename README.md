## Description

https://thedevlounge.com API 서버입니다.

## Documentation(Swagger)

- https://api.main.thedevlounge.com/doc

## Architecture and Directory Structure(Hexagonal And Clean Architecture)
- Hexagonal And Clean Architecture를 준수하여 코드 및 디렉터리 구조를 구성
- Domain 중심으로 코드 설계
  - input-adapter(ex: restAPI controller)  => input-port => (application => Domain) <= output-port <= output-adapter(ex: typeorm repository)
### Directory Structure
- domain
  - adapter : port를 구현한 구현체
    - input
    - output
      - [구현체] : ex: typeorm
        - entities or documents
        - mapper : entity나 document 객체를 domain 객체로 변환하는 메서드
        - adapter
  - application : domain 로직과 더불어 실질적으로 애플리케이션을 작동시킬 코드(기존 서비스 코드)
  - domain : domain 객체 및 로직
  - dto : Request/Response DTO
  - port : 여러 adapter이 구현될 interface
    - input : Input Adapter(ex: controller)가 구현해야하는 진입 포트
    - output : Output Adapter(ex:repository)가 구현해야하는 outro 포트
  - module 

# Deployment(github action flow)
1. 앱 도커이미지 빌드 후 도커헙 푸시
2. EC2에서 푸시된 도커 이미지 pull
3. 앱+prometheus+grafana => docker compose로 실행


## Monitoring
- Prometheus + Grafana
- 모니터링 요소
    - 각 API 호출 횟수/ ROUTE / 요청-응답 시간
    - CPU 사용률
    - RAM 사용률

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

