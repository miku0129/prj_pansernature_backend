import { Injectable } from '@nestjs/common';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';
import { Purchase } from './entities/purchase.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PurchasesService {
  constructor(
    @InjectRepository(Purchase)
    private purchaseRepository: Repository<Purchase>,
  ) {}

  create(createPurchaseDto: CreatePurchaseDto): Promise<Purchase> {
    const newPurchase = this.purchaseRepository.create(createPurchaseDto);
    return this.purchaseRepository.save(newPurchase);
  }

  findAll() {
    return `This action returns all purchases`;
  }

  findOne(id: number) {
    return `This action returns a #${id} purchase`;
  }

  update(id: number, updatePurchaseDto: UpdatePurchaseDto) {
    return `This action updates a #${id} purchase`;
  }

  remove(id: number) {
    return `This action removes a #${id} purchase`;
  }
}
