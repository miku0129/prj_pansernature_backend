import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

describe('UsersService', () => {
  let service: UsersService;
  let users = [];

  const mockUserRepository = {
    create: jest.fn().mockImplementation((dto) => dto),
    save: jest.fn().mockImplementation((user) => {
      const newUser = {
        id: Date.now(),
        ...user,
        is_valid: true,
        created_date: new Date('2016-08-25T00:00:00'),
        updated_date: new Date('2016-08-25T00:00:00'),
      };
      users.push(newUser);
      return Promise.resolve(newUser);
    }),
    find: jest.fn().mockImplementation(() => users),
    findOneOrFail: jest.fn().mockImplementation(({ where: { id: id } }) => {
      return users.find((item) => item.id === id);
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    users = [];
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user record and return that', async () => {
      const newUser = await service.create({
        name: 'Cat',
        firstname: 'Cool',
        address: '003 CAMBRIDGE CATRIN',
        postalcode: '30000',
        email: 'catcool@sample.email',
      });
      expect(newUser).toEqual({
        id: expect.any(Number),
        name: 'Cat',
        firstname: 'Cool',
        address: '003 CAMBRIDGE CATRIN',
        postalcode: '30000',
        email: 'catcool@sample.email',
        is_valid: true,
        created_date: expect.any(Date),
        updated_date: expect.any(Date),
      });
    });
  });

  describe('findAll', () => {
    it('should return all users', async () => {
      await service.create({
        name: 'test1',
        firstname: 'TEST1',
        address: '001 TEST TEST',
        postalcode: '10000',
        email: 'test1test1@sample.email',
      });
      await service.create({
        name: 'test2',
        firstname: 'TEST2',
        address: '002 TEST TEST',
        postalcode: '20000',
        email: 'test2test2@sample.email',
      });
      expect((await service.findAll()).length).toBe(2);
    });
  });

  describe('findOne', () => {
    it('should return a user by id', async () => {
      const user1 = await service.create({
        name: 'test1',
        firstname: 'TEST1',
        address: '001 TEST TEST',
        postalcode: '10000',
        email: 'test1test1@sample.email',
      });
      const user2 = await service.create({
        name: 'test2',
        firstname: 'TEST2',
        address: '002 TEST TEST',
        postalcode: '20000',
        email: 'test2test2@sample.email',
      });
      const foundUser = await service.findOne(user1.id);
      expect(foundUser).toEqual({
        id: expect.any(Number),
        name: 'test1',
        firstname: 'TEST1',
        address: '001 TEST TEST',
        postalcode: '10000',
        email: 'test1test1@sample.email',
        is_valid: true,
        created_date: expect.any(Date),
        updated_date: expect.any(Date),
      });
    });
  });
});
