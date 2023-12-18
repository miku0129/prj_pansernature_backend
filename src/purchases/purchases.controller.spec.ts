import { Test, TestingModule } from '@nestjs/testing';
import { PurchasesController } from './purchases.controller';
import { PurchasesService } from './purchases.service';

describe('PurchasesController', () => {
  let controller: PurchasesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PurchasesController],
      providers: [PurchasesService],
    }).compile();

    controller = module.get<PurchasesController>(PurchasesController);
  });

  xit('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
