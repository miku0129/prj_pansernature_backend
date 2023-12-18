import { Test, TestingModule } from '@nestjs/testing';
import { MembershipsService } from './memberships.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Membership } from './entities/membership.entity';

describe('MembershipsService', () => {
  let service: MembershipsService;
  let memberships = [];

  const mockMembershipRepository = {
    create: jest.fn().mockImplementation((dto) => dto),
    save: jest.fn().mockImplementation((membership) => {
      const newMembership = {
        id: 1,
        created_date: new Date('2016-08-25T00:00:00'),
        is_valid: false,
        ...membership,
      };
      memberships.push(newMembership);
      return Promise.resolve(newMembership);
    }),
    find: jest.fn().mockImplementation(() => memberships),
    findOneOrFail: jest.fn().mockImplementation(({ where: { id: id } }) => {
      return memberships.find((membership) => membership.id === id);
    }),
    remove: jest.fn().mockImplementation((id) => {
      const membership = memberships.find((membership) => membership.id === id);
      memberships = memberships.filter((user) => user.id !== id);
      return membership;
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MembershipsService,
        {
          provide: getRepositoryToken(Membership),
          useValue: mockMembershipRepository,
        },
      ],
    }).compile();

    service = module.get<MembershipsService>(MembershipsService);
    memberships = [];
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create membership', () => {
    it('should create a new membership record and return that', async () => {
      const newMembership = await service.create({
        end_date: new Date('2016-08-25T00:00:00'),
      });
      expect(newMembership).toEqual({
        id: expect.any(Number),
        created_date: expect.any(Date),
        end_date: expect.any(Date),
        is_valid: false,
      });
    });
  });

  describe('findAll', () => {
    it('should return all memberships', async () => {
      await service.create({
        end_date: new Date('2016-08-25T00:00:00'),
      });
      await service.create({
        end_date: new Date('2016-08-25T00:00:00'),
      });
      expect((await service.findAll()).length).toBe(2);
    });
  });

  describe('findOne', () => {
    it('should return a membership by id', async () => {
      const membership1 = await service.create({
        end_date: new Date('2016-08-25T00:00:00'),
      });
      const membership2 = await service.create({
        end_date: new Date('2020-08-25T00:00:00'),
      });
      const foundItem = await service.findOne(membership1.id);
      expect(foundItem).toEqual({
        id: expect.any(Number),
        created_date: expect.any(Date),
        end_date: new Date('2016-08-25T00:00:00'),
        is_valid: false,
      });
    });
  });

  describe('update', () => {
    it('should update a membership', async () => {
      const membership = await service.create({
        end_date: new Date('2016-08-25T00:00:00'),
      });
      const updatedinfo = {
        ...membership,
        end_date: new Date('2020-08-25T00:00:00'),
      };
      const updatedMembership = await service.update(
        membership.id,
        updatedinfo,
      );
      expect(updatedMembership).toEqual({
        id: expect.any(Number),
        created_date: expect.any(Date),
        end_date: new Date('2020-08-25T00:00:00'),
        is_valid: false,
      });
    });
  });

  describe('remove', () => {
    it('should remove a membership', async () => {
      const membership = await service.create({
        end_date: new Date('2016-08-25T00:00:00'),
      });
      expect(await service.remove(membership.id)).toEqual(membership);
    });
  });
});
