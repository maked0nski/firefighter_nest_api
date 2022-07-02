import { Test, TestingModule } from '@nestjs/testing';
import { SimCardController } from './sim_card.controller';

describe('SimCardController', () => {
  let controller: SimCardController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SimCardController],
    }).compile();

    controller = module.get<SimCardController>(SimCardController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
