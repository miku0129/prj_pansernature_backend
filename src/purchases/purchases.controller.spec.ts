import { Test, TestingModule } from '@nestjs/testing';
import { PurchasesController } from './purchases.controller';
import { PurchasesService } from './purchases.service';

describe('PurchasesController', () => {
  let controller: PurchasesController;
  let purchases = [];

  const create_dto = {
    is_valid: true,
  };
  const update_dto = {
    ...create_dto,
    is_valid: false,
  };

  interface Purchase {
    id: number;
    purchased_date: Date;
  }

  const getUniqueNum = (): number => {
    return Date.now() + Math.random();
  };

  const mockPurchaseService = {
    create: jest.fn((create_dto): Purchase => {
      const newPurchase = {
        id: getUniqueNum(),
        purchased_date: new Date('2016-08-25T00:00:00'),
        ...create_dto,
      };
      purchases.push(newPurchase);
      return newPurchase;
    }),
    findAll: jest.fn(() => purchases),
    findOne: jest.fn().mockImplementation((id) => {
      return purchases.find((purchase) => purchase.id === id);
    }),
    update: jest.fn().mockImplementation((id, update_dto) => {
      const foundpurchase = purchases.find((purchase) => purchase.id === id);
      return { ...foundpurchase, ...update_dto };
    }),

    remove: jest.fn().mockImplementation((id) => {
      const purchase = purchases.find((purchase) => purchase.id === id);
      purchases = purchases.filter((purchase) => purchase.id !== id);
      return purchase;
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PurchasesController],
      providers: [PurchasesService],
    })
      .overrideProvider(PurchasesService)
      .useValue(mockPurchaseService)
      .compile();

    controller = module.get<PurchasesController>(PurchasesController);

    purchases = [];
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a purchase', async () => {
      expect(await controller.create(create_dto)).toEqual({
        id: expect.any(Number),
        purchased_date: expect.any(Date),
        is_valid: true,
      });
    });
  });

  describe('findAll', () => {
    it('should get all purchases', async () => {
      controller.create(create_dto);
      controller.create(create_dto);
      controller.create(create_dto);

      const result = await controller.findAll();
      expect(result.length).toBe(3);
    });
  });

  describe('findOne', () => {
    it('should find a purchase by id', async () => {
      const purchase = await controller.create(create_dto);

      const result = await controller.findOne(String(purchase.id));
      expect(result.id).toEqual(purchase.id);
    });
  });

  describe('update', () => {
    it('should updat info of purcase by id', async () => {
      const purchase = await controller.create(create_dto);
      const updated_purchase = await controller.update(
        String(purchase.id),
        update_dto,
      );
      expect(updated_purchase.is_valid).toBe(false);
    });
  });

  describe('remove', () => {
    it('should remove a purchase by id', async () => {
      const purchase = await controller.create(create_dto);
      const removedItem = await controller.remove(String(purchase.id));
      expect(removedItem.id).toEqual(purchase.id);
    });
  });
});
