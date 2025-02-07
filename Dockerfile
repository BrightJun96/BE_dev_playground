#DEV
FROM node:alpine AS development

WORKDIR /usr/src/app

COPY package*.json ./
COPY pnpm-lock.yaml ./
COPY tsconfig.json tsconfig.json
COPY tsconfig.build.json tsconfig.build.json
COPY nest-cli.json nest-cli.json

# bcrypt 빌드에 필요한 패키지 설치
RUN apk add --no-cache python3 g++ make

RUN npm i -g pnpm
RUN pnpm install --ignore-scripts
RUN pnpm rebuild bcrypt  # bcrypt 강제 빌드

#RUN npm i -g pnpm
#RUN pnpm i

COPY src src

RUN pnpm run build

CMD ["pnpm","run","start:dev"]

#PRODUCTION
FROM node:alpine AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./
COPY pnpm-lock.yaml ./


#RUN npm i -g pnpm
#RUN pnpm install --prod

# bcrypt 빌드에 필요한 패키지 설치
RUN apk add --no-cache python3 g++ make

RUN npm i -g pnpm
RUN pnpm install --prod  # --ignore-scripts 제거
RUN pnpm rebuild bcrypt  # bcrypt 강제 빌드


COPY --from=development /usr/src/app/dist ./dist

COPY . .

CMD ["pnpm", "run", "start:prod"]
