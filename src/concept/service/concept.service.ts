import { Injectable } from "@nestjs/common";
import { CreateConceptRequestDto } from "../dto/request/create-concept.request.dto";
import { UpdateConceptRequestDto } from "../dto/request/update-concept.request.dto";

@Injectable()
export class ConceptService {
  create(createConceptDto: CreateConceptRequestDto) {
    return "This action adds a new concept";
  }

  findAll() {
    return `This action returns all concept`;
  }

  findOne(id: number) {
    return `This action returns a #${id} concept`;
  }

  update(
    id: number,
    updateConceptDto: UpdateConceptRequestDto,
  ) {
    return `This action updates a #${id} concept`;
  }

  remove(id: number) {
    return `This action removes a #${id} concept`;
  }
}
