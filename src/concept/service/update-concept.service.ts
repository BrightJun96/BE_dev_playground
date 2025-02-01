import { Injectable } from "@nestjs/common";
import { UpdateConceptRequestDto } from "../dto/request/update-concept.request.dto";

@Injectable()
export class UpdateConceptService {
  update(
    id: number,
    updateConceptDto: UpdateConceptRequestDto,
  ) {
    return `This action updates a #${id} concept`;
  }
}
