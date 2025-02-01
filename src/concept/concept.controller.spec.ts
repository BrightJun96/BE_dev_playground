import { Test, TestingModule } from '@nestjs/testing';
import { ConceptController } from './concept.controller';
import { ConceptService } from './concept.service';

describe('ConceptController', () => {
  let controller: ConceptController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConceptController],
      providers: [ConceptService],
    }).compile();

    controller = module.get<ConceptController>(ConceptController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
