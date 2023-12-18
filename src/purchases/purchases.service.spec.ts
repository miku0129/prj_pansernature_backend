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

  describe('create purchase', () => {
    it('should create a new purchase record and return that', async () => {
      const newPurchase = await service.create({});
      expect(newPurchase).toEqual({
        id: expect.any(Number),
        purchased_date: expect.any(Date),
      });
    });
  });
});
