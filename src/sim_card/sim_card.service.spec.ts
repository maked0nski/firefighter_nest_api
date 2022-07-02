import { Test, TestingModule } from '@nestjs/testing';
import { SimCardService } from './sim_card.service';

describe('SimCardService', () => {
  let service: SimCardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SimCardService],
    }).compile();

    service = module.get<SimCardService>(SimCardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
