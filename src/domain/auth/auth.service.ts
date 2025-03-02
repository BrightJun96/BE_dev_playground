import {
  Cache,
  CACHE_MANAGER,
} from "@nestjs/cache-manager";
import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from "bcryptjs";
import { Repository } from "typeorm";
import { CACHE_KEY } from "../../shared/const/cache-key.const";
import { envVariablesKeys } from "../../shared/const/env.const";
import { Role, User } from "../user/entities/user.entity";
import { UserService } from "../user/user.service";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
    private readonly userService: UserService,
  ) {}

  // 토큰 블락
  async tokenBlock(token: string) {
    const decodedPayload = this.jwtService.decode(token);

    // 만료시간
    const exp = decodedPayload["exp"] * 1000;
    // 현재시간
    const now = Date.now();
    // 만료시간 - 현재시간
    const differenceInSeconds = (exp - now) / 1000;
    // 만료시간 - 현재시간 - 30초
    const TTL = Math.max(differenceInSeconds * 1000, 1);

    await this.cacheManager.set(
      CACHE_KEY.BLOCKED_TOKEN(token),
      decodedPayload,
      TTL,
    );

    return true;
  }

  // 토큰 파싱
  parseBasicToken(rawToken: string) {
    // 토큰을 " "기준으로 스플릿하여 토큰 추출
    const basicSplit = rawToken.split(" ");

    if (basicSplit.length !== 2) {
      throw new BadRequestException(
        "토큰 포맷이 잘못되었습니다.",
      );
    }
    const [BASIC, token] = basicSplit;

    if (BASIC.toLowerCase() !== "basic") {
      throw new BadRequestException(
        "토큰 포맷이 잘못되었습니다.",
      );
    }

    // 토큰을 base64 디코딩하여 email와 password 추출

    const decoded = Buffer.from(token, "base64").toString(
      "utf-8",
    );

    // email:password
    const tokenSplit = decoded.split(":");

    if (tokenSplit.length !== 2) {
      throw new BadRequestException(
        "토큰 포맷이 잘못되었습니다.",
      );
    }

    const [email, password] = tokenSplit;

    return {
      email,
      password,
    };
  }

  // rawToken => Basic Token
  async register(rawToken: string) {
    const { email, password } =
      this.parseBasicToken(rawToken);

    return await this.userService.create({
      email,
      password,
    });
  }

  async authenticate(email: string, password: string) {
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      throw new BadRequestException(
        "잘못된 로그인 정보입니다. ",
      );
    }

    const passOk = await bcrypt.compare(
      password,
      user.password,
    );

    if (!passOk) {
      throw new BadRequestException(
        "잘못된 로그인 정보입니다. ",
      );
    }

    return user;
  }

  async issueToken(
    user: {
      id: number;
      role: Role;
    },
    isRefreshToken: boolean,
  ) {
    const accessTokenSecret =
      this.configService.get<string>(
        envVariablesKeys.ACCESS_TOKEN_SECRET,
      );

    const refreshTokenSecret =
      this.configService.get<string>(
        envVariablesKeys.REFRESH_TOKEN_SECRET,
      );
    return await this.jwtService.signAsync(
      {
        sub: user.id,
        role: user.role,
        type: isRefreshToken ? "refresh" : "access",
      },
      {
        secret: isRefreshToken
          ? refreshTokenSecret
          : accessTokenSecret,
        expiresIn: isRefreshToken ? "24h" : 300,
      },
    );
  }

  async login(rawToken: string) {
    const { email, password } =
      this.parseBasicToken(rawToken);

    const user = await this.authenticate(email, password);

    return {
      accessToken: await this.issueToken(user, false),
      refreshToken: await this.issueToken(user, true),
    };
  }

  // 리프래쉬 토큰 여부 검증(엑세스 토큰 재발급 API에 사용)
  validateRefreshToken(tokenType: string) {
    if (tokenType !== "refresh") {
      throw new BadRequestException(
        "리프래쉬 토큰이 아닙니다.",
      );
    }
  }

  parseBearerToken(rawToken: string) {
    const bearerSplit = rawToken.split(" ");

    if (bearerSplit.length !== 2) {
      throw new BadRequestException(
        "토큰 포맷이 잘못되었습니다.",
      );
    }

    const [BEARER, token] = bearerSplit;

    if (BEARER.toLowerCase() !== "bearer") {
      throw new BadRequestException(
        "토큰 포맷이 잘못되었습니다.",
      );
    }

    return token;
  }

  // 토큰 검증 및 request에 user 저장
  async verifyBearerToken(token: string, secret: string) {
    try {
      const cache = await this.cacheManager.get(
        CACHE_KEY.TOKEN(token),
      );
      if (cache) {
        return cache;
      }
      const tokenInfo = await this.jwtService.verifyAsync(
        token,
        {
          secret,
        },
      );

      // await this.setTokenCache(token, tokenInfo);

      return tokenInfo;
    } catch (e) {
      throw new UnauthorizedException(
        "토큰이 만료되었습니다.",
      );
    }
  }

  validateTokenType(token: string) {
    try {
      const decodedPayload = this.jwtService.decode(token);

      if (!decodedPayload) {
        throw new BadRequestException("잘못된 토큰입니다.");
      }

      if (
        decodedPayload.type !== "access" &&
        decodedPayload.type !== "refresh"
      ) {
        throw new BadRequestException("잘못된 토큰입니다.");
      }

      return decodedPayload.type;
    } catch (e) {
      throw e;
    }
  }

  // token secret 조회
  getTokenSecret(tokenType: string) {
    return this.configService.get<string>(
      tokenType === "refresh"
        ? envVariablesKeys.REFRESH_TOKEN_SECRET
        : envVariablesKeys.ACCESS_TOKEN_SECRET,
    );
  }
}
