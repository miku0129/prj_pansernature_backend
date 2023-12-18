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
    find: jest.fn().mockImplementation(() => items),
    findOneOrFail: jest.fn().mockImplementation(({ where: { id: id } }) => {
      return items.find((item) => item.id === id);
    }),
    remove: jest.fn().mockImplementation((id) => {
      const item = items.find((item) => item.id === id);
      items = items.filter((user) => user.id !== id);
      return item;
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
        is_ebook: true,
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

  describe('findAll', () => {
    it('should return all items', async () => {
      await service.create({
        title: 'sample ebook',
        detail: 'this is sample ebook',
        price: 30,
        image_url: 'url-of-image',
        is_ebook: true,
      });
      await service.create({
        title: 'sample ebook2',
        detail: 'this is sample ebook2',
        price: 30,
        image_url: 'url-of-image',
        is_ebook: true,
      });
      expect((await service.findAll()).length).toBe(2);
    });
  });

  describe('findOne', () => {
    it('should return a item by id', async () => {
      const item1 = await service.create({
        title: 'sample ebook1',
        detail: 'this is sample ebook1',
        price: 30,
        image_url: 'url-of-image',
        is_ebook: true,
      });
      const item2 = await service.create({
        title: 'sample ebook1',
        detail: 'this is sample ebook1',
        price: 30,
        image_url: 'url-of-image',
        is_ebook: true,
      });
      const foundItem = await service.findOne(item1.id);
      expect(foundItem).toEqual({
        id: expect.any(Number),
        title: 'sample ebook1',
        detail: 'this is sample ebook1',
        price: 30,
        image_url: 'url-of-image',
        is_ebook: true,
        created_date: expect.any(Date),
        updated_date: expect.any(Date),
      });
    });
  });
});
