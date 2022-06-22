import { Test, TestingModule } from '@nestjs/testing';
import { FuelCardController } from './fuel_card.controller';

describe('FuelCardController', () => {
  let controller: FuelCardController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FuelCardController],
    }).compile();

    controller = module.get<FuelCardController>(FuelCardController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
