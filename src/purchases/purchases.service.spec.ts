import { Test, TestingModule } from '@nestjs/testing';
import { PurchasesService } from './purchases.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Purchase } from './entities/purchase.entity';

describe('PurchasesService', () => {
  let service: PurchasesService;
  let purchases = [];

  const mockPurchaseRepository = {
    create: jest.fn().mockImplementation((dto) => dto),
    save: jest.fn().mockImplementation((purchase) => {
      const newPurchase = {
        id: Date.now(),
        purchased_date: new Date('2016-08-25T00:00:00'),
        ...purchase,
      };
      purchases.push(newPurchase);
      return Promise.resolve(newPurchase);
    }),
    find: jest.fn().mockImplementation(() => purchases),
    findOneOrFail: jest.fn().mockImplementation(({ where: { id: id } }) => {
      return purchases.find((purchase) => purchase.id === id);
    }),
    remove: jest.fn().mockImplementation((id) => {
      const purchase = purchases.find((purchase) => purchase.id === id);
      purchases = purchases.filter((user) => user.id !== id);
      return purchase;
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PurchasesService,
        {
          provide: getRepositoryToken(Purchase),
          useValue: mockPurchaseRepository,
        },
      ],
    }).compile();

    service = module.get<PurchasesService>(PurchasesService);
    purchases = [];
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new purchase record and return that', async () => {
      const newPurchase = await service.create({});
      expect(newPurchase).toEqual({
        id: expect.any(Number),
        purchased_date: expect.any(Date),
      });
    });
  });

  describe('findAll', () => {
    it('should return all purchases', async () => {
      await service.create({});
      await service.create({});
      expect((await service.findAll()).length).toBe(2);
    });
  });

  describe('findOne', () => {
    it('should return a purchase by id', async () => {
      const purchase1 = await service.create({});
      const purchase2 = await service.create({});

      const foundItem = await service.findOne(purchase1.id);
      expect(foundItem).toEqual({
        id: expect.any(Number),
        purchased_date: expect.any(Date),
      });
    });
  });

  describe('update', () => {
    it('should update info of purchase', async () => {
      const purchase = await service.create({
        purchased_date: new Date('2016-08-25T00:00:00'),
        is_valid: true,
      });
      const updatedinfo = {
        ...purchase,
        purchased_date: new Date('2020-08-25T00:00:00'),
      };
      const updatedPurchase = await service.update(purchase.id, updatedinfo);
      expect(updatedPurchase).toEqual({
        id: expect.any(Number),
        purchased_date: expect.any(Date),
        is_valid: true,
      });
    });
  });

  describe('remove', () => {
    it('should remove a purchase', async () => {
      const purchase = await service.create({});

      expect(await service.remove(purchase.id)).toEqual(purchase);
    });
  });
});
