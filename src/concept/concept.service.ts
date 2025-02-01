import { Injectable } from '@nestjs/common';
import { CreateConceptDto } from './dto/create-concept.dto';
import { UpdateConceptDto } from './dto/update-concept.dto';

@Injectable()
export class ConceptService {
  create(createConceptDto: CreateConceptDto) {
    return 'This action adds a new concept';
  }

  findAll() {
    return `This action returns all concept`;
  }

  findOne(id: number) {
    return `This action returns a #${id} concept`;
  }

  update(id: number, updateConceptDto: UpdateConceptDto) {
    return `This action updates a #${id} concept`;
  }

  remove(id: number) {
    return `This action removes a #${id} concept`;
  }
}
