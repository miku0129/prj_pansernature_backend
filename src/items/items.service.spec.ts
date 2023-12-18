import { Test, TestingModule } from '@nestjs/testing';
import { ItemsService } from './items.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';

describe('ItemsService', () => {
  let service: ItemsService;
  let items = [];

  const mockItemRepository = {
    create: jest.fn().mockImplementation((dto) => dto),
    save: jest.fn().mockImplementation((item) => {
      const newItem = {
        id: Date.now(),
        ...item,
        created_date: new Date('2016-08-25T00:00:00'),
        updated_date: new Date('2016-08-25T00:00:00'),
      };
      items.push(newItem);
      return Promise.resolve(newItem);
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ItemsService,
        {
          provide: getRepositoryToken(Item),
          useValue: mockItemRepository,
        },
      ],
    }).compile();

    service = module.get<ItemsService>(ItemsService);
    items = [];
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create item', () => {
    it('should create a new item record and return that', async () => {
      const newItem = await service.create({
        title: 'sample ebook',
        detail: 'this is sample ebook',
        price: 30,
        image_url: 'url-of-image',
        is_ebook: true
      });
      expect(newItem).toEqual({
        id: expect.any(Number),
        title: 'sample ebook',
        detail: 'this is sample ebook',
        price: 30,
        image_url: 'url-of-image',
        is_ebook: true,
        created_date: expect.any(Date),
        updated_date: expect.any(Date),
      });
    });
  });
});
