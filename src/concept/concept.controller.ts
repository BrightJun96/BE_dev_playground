import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ConceptService } from './concept.service';
import { CreateConceptDto } from './dto/create-concept.dto';
import { UpdateConceptDto } from './dto/update-concept.dto';

@Controller('concept')
export class ConceptController {
  constructor(private readonly conceptService: ConceptService) {}

  @Post()
  create(@Body() createConceptDto: CreateConceptDto) {
    return this.conceptService.create(createConceptDto);
  }

  @Get()
  findAll() {
    return this.conceptService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.conceptService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateConceptDto: UpdateConceptDto) {
    return this.conceptService.update(+id, updateConceptDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.conceptService.remove(+id);
  }
}
