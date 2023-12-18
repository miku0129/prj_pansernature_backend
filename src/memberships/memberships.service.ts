import { Injectable } from '@nestjs/common';
import { CreateMembershipDto } from './dto/create-membership.dto';
import { UpdateMembershipDto } from './dto/update-membership.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Membership } from './entities/membership.entity';

@Injectable()
export class MembershipsService {
  constructor(
    @InjectRepository(Membership)
    private membershipRepository: Repository<Membership>,
  ) {}
  create(createMembershipDto: CreateMembershipDto): Promise<Membership> {
    const newMembership = this.membershipRepository.create(createMembershipDto);
    return this.membershipRepository.save(newMembership);
  }

  findAll(): Promise<Membership[]> {
    return this.membershipRepository.find();
  }

  async findOne(id: number): Promise<Membership> {
    try {
      const membership = await this.membershipRepository.findOneOrFail({
        where: { id: id },
      });
      return membership;
    } catch (err) {
      throw err;
    }
  }

  async update(
    id: number,
    updateMembershipDto: UpdateMembershipDto,
  ): Promise<Membership> {
    let membership = await this.membershipRepository.findOneOrFail({
      where: { id: id },
    });
    membership = { ...membership, ...updateMembershipDto };
    return this.membershipRepository.save(membership);
  }

  async remove(id: number): Promise<Membership> {
    const membership = await this.membershipRepository.findOneOrFail({
      where: { id: id },
    });
    this.membershipRepository.remove(membership);
    return membership;
  }
}
