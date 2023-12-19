import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let users = [];

  const create_dto = {
    name: 'test',
    firstname: 'TEST',
    address: 'TEST ADDRESS',
    postalcode: '10000',
    email: 'test@sample.email',
  };
  const update_dto = {
    ...create_dto,
    name: 'awesome test',
    is_valid: true,
  };

  interface User {
    id: number;
    name: string;
    firstname: string;
    address: string;
    postalcode: string;
    email: string;
    is_valid: boolean;
    created_date: Date;
    updated_date: Date;
  }

  const getUniqueNum = (): number => {
    return Date.now() + Math.random();
  };

  const mockUserService = {
    create: jest.fn((create_dto): User => {
      const newUser = {
        id: getUniqueNum(),
        ...create_dto,
        is_valid: true,
        created_date: new Date('2016-08-25T00:00:00'),
        updated_date: new Date('2016-08-25T00:00:00'),
      };
      users.push(newUser);
      return newUser;
    }),
    findAll: jest.fn(() => users),
    findOne: jest.fn().mockImplementation((id) => {
      return users.find((user) => user.id === id);
    }),
    update: jest.fn().mockImplementation((id, update_dto) => {
      const founduser = users.find((user) => user.id === id);
      return { ...founduser, ...update_dto };
    }),
    remove: jest.fn().mockImplementation((id) => {
      const user = users.find((user) => user.id === id);
      users = users.filter((user) => user.id !== id);
      return user;
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    })
      .overrideProvider(UsersService)
      .useValue(mockUserService)
      .compile();

    controller = module.get<UsersController>(UsersController);

    users = [];
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a user', async () => {
      expect(await controller.create(create_dto)).toEqual({
        id: expect.any(Number),
        name: create_dto.name,
        firstname: create_dto.firstname,
        address: create_dto.address,
        postalcode: create_dto.postalcode,
        email: create_dto.email,
        is_valid: expect.any(Boolean),
        created_date: expect.any(Date),
        updated_date: expect.any(Date),
      });
    });
  });

  describe('findAll', () => {
    it('should get all users', async () => {
      controller.create(create_dto);
      controller.create(create_dto);
      controller.create(create_dto);

      const result = await controller.findAll();
      expect(result.length).toBe(3);
    });
  });

  describe('findOne', () => {
    it('should find a user by id', async () => {
      let user1 = await controller.create(create_dto);
      let user2 = await controller.create({ ...create_dto, name: 'examin' });

      const result = await controller.findOne(String(user2.id));
      expect(result.name).toBe('examin');
    });
  });

  describe('update', () => {
    it('should update a user by id', async () => {
      const user = await controller.create(create_dto);

      const updated_user = await controller.update(String(user.id), update_dto);

      expect(updated_user.name).toBe('awesome test');
    });
  });

  describe('remove', () => {
    it('should remove a user by id', async () => {
      const user = await controller.create(create_dto);
      const removedUser = await controller.remove(String(user.id));
      expect(removedUser.id).toEqual(user.id);
    });
  });
});
