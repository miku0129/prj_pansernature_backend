import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = this.userRepository.create(createUserDto);
    return this.userRepository.save(newUser);
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find({
      relations: ['memberships', 'purchases'],
    });
  }

  async findOne(id: number): Promise<User> {
    try {
      const user = await this.userRepository.findOneOrFail({
        where: { id: id },
        relations: ['memberships', 'purchases'],
      });
      return user;
    } catch (err) {
      throw err;
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    let user = await this.userRepository.findOneOrFail({
      where: { id: id },
      relations: ['memberships', 'purchases'],
    });
    user = { ...user, ...updateUserDto };
    return this.userRepository.save(user);
  }

  async remove(id: number): Promise<User> {
    const user = await this.userRepository.findOneOrFail({
      where: { id: id },
    });
    this.userRepository.remove(user);
    return user;
  }
}
