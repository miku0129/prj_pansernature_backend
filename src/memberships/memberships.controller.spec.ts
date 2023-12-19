import { Test, TestingModule } from '@nestjs/testing';
import { MembershipsController } from './memberships.controller';
import { MembershipsService } from './memberships.service';

describe('MembershipsController', () => {
  let controller: MembershipsController;
  let memberships = [];

  const create_dto = {
    end_date: new Date('2016-08-25T00:00:00'),
  };
  const update_dto = {
    ...create_dto,
    is_valid: true,
  };

  interface Membership {
    id: number;
    created_date: Date;
    end_date: Date;
    is_valid: boolean;
  }
  const getUniqueNum = (): number => {
    return Date.now() + Math.random();
  };

  const mockMembershipService = {
    create: jest.fn((create_dto): Membership => {
      const newMembership = {
        id: getUniqueNum(),
        created_date: new Date('2016-08-25T00:00:00'),
        is_valid: false,
        ...create_dto,
      };
      memberships.push(newMembership);
      return newMembership;
    }),
    findAll: jest.fn(() => memberships),
    findOne: jest.fn().mockImplementation((id) => {
      return memberships.find((membership) => membership.id === id);
    }),
    update: jest.fn().mockImplementation((id, update_dto) => {
      const foundmembership = memberships.find(
        (membership) => membership.id === id,
      );
      return { ...foundmembership, ...update_dto };
    }),
    remove: jest.fn().mockImplementation((id) => {
      const membership = memberships.find((membership) => membership.id === id);
      memberships = memberships.filter((membership) => membership.id !== id);
      return membership;
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MembershipsController],
      providers: [MembershipsService],
    })
      .overrideProvider(MembershipsService)
      .useValue(mockMembershipService)
      .compile();
    controller = module.get<MembershipsController>(MembershipsController);

    memberships = [];
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a membership', async () => {
      expect(await controller.create(create_dto)).toEqual({
        id: expect.any(Number),
        created_date: expect.any(Date),
        end_date: create_dto.end_date,
        is_valid: expect.any(Boolean),
      });
    });
  });

  describe('findAll', () => {
    it('should get all membership', async () => {
      controller.create(create_dto);
      controller.create(create_dto);
      controller.create(create_dto);
      const result = await controller.findAll();
      expect(result.length).toBe(3);
    });
  });

  describe('findOne', () => {
    it('should find a membership by id', async () => {
      const membership = await controller.create(create_dto);
      const result = await controller.findOne(String(membership.id));
      expect(result.id).toEqual(membership.id);
    });
  });

  describe('update', () => {
    it('should update a memberhsip by id', async () => {
      const memberhsip = await controller.create(create_dto);
      const updated_memberhsip = await controller.update(
        String(memberhsip.id),
        update_dto,
      );
      expect(updated_memberhsip.is_valid).toBe(true);
    });
  });

  describe('remove', () => {
    it('should remove a membership by id', async () => {
      const memberhsip = await controller.create(create_dto);
      const removedMembership = await controller.remove(String(memberhsip.id));
      expect(removedMembership.id).toEqual(memberhsip.id);
    });
  });
});
