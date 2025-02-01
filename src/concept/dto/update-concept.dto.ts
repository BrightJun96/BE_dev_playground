import { PartialType } from '@nestjs/swagger';
import { CreateConceptDto } from './create-concept.dto';

export class UpdateConceptDto extends PartialType(CreateConceptDto) {}
