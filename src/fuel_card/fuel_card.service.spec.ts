import { Test, TestingModule } from '@nestjs/testing';
import { FuelCardService } from './fuel_card.service';

describe('FuelCardService', () => {
  let service: FuelCardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FuelCardService],
    }).compile();

    service = module.get<FuelCardService>(FuelCardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
