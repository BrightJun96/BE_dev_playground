import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CodeService } from "./code.service";
import { CreateCodeDto } from "./dto/create-code.dto";
import { UpdateCodeDto } from "./dto/update-code.dto";

@Controller("code")
@ApiTags("코드 템플릿")
export class CodeController {
  constructor(private readonly codeService: CodeService) {}

  @Post()
  create(@Body() createCodeDto: CreateCodeDto) {
    return this.codeService.create(createCodeDto);
  }

  @Get()
  findAll() {
    return this.codeService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.codeService.findOne(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateCodeDto: UpdateCodeDto,
  ) {
    return this.codeService.update(+id, updateCodeDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.codeService.remove(+id);
  }
}
