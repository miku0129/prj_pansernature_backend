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

  describe('create user', () => {
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

  describe('get all users', () => {
    it('should return all users', async () => {
      await service.create({
        name: 'Cat',
        firstname: 'Cool',
        address: '003 CAMBRIDGE CATRIN',
        postalcode: '30000',
        email: 'catcool@sample.email',
      });
      await service.create({
        name: 'Cat',
        firstname: 'Cool',
        address: '003 CAMBRIDGE CATRIN',
        postalcode: '30000',
        email: 'catcool@sample.email',
      });
      expect((await service.findAll()).length).toBe(2);
    });
  });
});
