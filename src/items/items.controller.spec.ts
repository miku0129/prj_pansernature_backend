import { Test, TestingModule } from '@nestjs/testing';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';

describe('ItemsController', () => {
  let controller: ItemsController;
  let items = [];

  const create_dto = {
    title: 'test item',
    detail: 'this is test item',
    price: 200,
    image_url: 'test-item-url',
    is_ebook: true,
  };
  const update_dto = {
    ...create_dto,
    title: 'updated item',
  };

  interface Item {
    id: number;
    title: string;
    detail: string;
    price: number;
    image_url: string;
    is_ebook: boolean;
    created_date: Date;
    updated_date: Date;
  }

  const getUniqueNum = (): number => {
    return Date.now() + Math.random();
  };

  const mockItemService = {
    create: jest.fn((create_dto): Item => {
      const newItem = {
        id: getUniqueNum(),
        ...create_dto,
        created_date: new Date('2016-08-25T00:00:00'),
        updated_date: new Date('2016-08-25T00:00:00'),
      };
      items.push(newItem);
      return newItem;
    }),
    findAll: jest.fn(() => items),
    findOne: jest.fn().mockImplementation((id) => {
      return items.find((item) => item.id === id);
    }),
    update: jest.fn().mockImplementation((id, update_dto) => {
      const founditem = items.find((item) => item.id === id);
      return { ...founditem, ...update_dto };
    }),
    remove: jest.fn().mockImplementation((id) => {
      const item = items.find((item) => item.id === id);
      items = items.filter((user) => user.id !== id);
      return item;
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemsController],
      providers: [ItemsService],
    })
      .overrideProvider(ItemsService)
      .useValue(mockItemService)
      .compile();

    controller = module.get<ItemsController>(ItemsController);

    items = [];
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a item', async () => {
      expect(await controller.create(create_dto)).toEqual({
        id: expect.any(Number),
        title: create_dto.title,
        detail: create_dto.detail,
        price: create_dto.price,
        image_url: create_dto.image_url,
        is_ebook: create_dto.is_ebook,
        created_date: expect.any(Date),
        updated_date: expect.any(Date),
      });
    });
  });

  describe('findOne', () => {
    it('should find a item by id', async () => {
      const item = await controller.create(create_dto);
      const result = await controller.findOne(String(item.id));
      expect(result.title).toBe('test item');
    });
  });

  describe('update', () => {
    it('should update a item by id', async () => {
      const item = await controller.create(create_dto);

      const updated_item = await controller.update(String(item.id), update_dto);

      expect(updated_item.title).toEqual(update_dto.title);
    });
  });

  describe('remove', () => {
    it('should remove a item by id', async () => {
      const item = await controller.create(create_dto);
      const removedItem = await controller.remove(String(item.id));
      expect(removedItem.id).toEqual(item.id);
    });
  });
});
