import { Injectable } from "@nestjs/common";
import { CreateConceptRequestDto } from "../dto/request/create-concept.request.dto";

@Injectable()
export class CreateConceptService {
  create(createConceptDto: CreateConceptRequestDto) {
    return "This action adds a new concept";
  }
}
