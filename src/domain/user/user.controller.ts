import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseInterceptors,
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { PositiveIntPipe } from "../../shared/pipe/positive-int.pipe";
import { RBAC } from "../auth/decorator/rbac.decorator";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { Role } from "./entities/user.entity";
import { UserService } from "./user.service";

@Controller("user")
@UseInterceptors(ClassSerializerInterceptor)
@ApiBearerAuth()
@ApiTags("USER")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @RBAC(Role.admin)
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @RBAC(Role.admin)
  findAll() {
    return this.userService.findAll();
  }

  @Get(":id")
  @RBAC(Role.admin)
  findOne(
    @Param("id", ParseIntPipe, PositiveIntPipe) id: number,
  ) {
    return this.userService.findOne(+id);
  }

  @Patch(":id")
  @RBAC(Role.admin)
  update(
    @Param("id", ParseIntPipe, PositiveIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(":id")
  @RBAC(Role.admin)
  remove(
    @Param("id", ParseIntPipe, PositiveIntPipe) id: number,
  ) {
    return this.userService.remove(+id);
  }
}
