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
        id: Date.now(),
        created_date: new Date('2016-08-25T00:00:00'),
        is_valid: false,
        ...membership,
      };
      memberships.push(newMembership);
      return Promise.resolve(newMembership);
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
});
