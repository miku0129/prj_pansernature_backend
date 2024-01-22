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

  findAll(): Promise<Purchase[]> {
    return this.purchaseRepository.find();
  }

  async findOne(id: number) {
    try {
      const purchase = await this.purchaseRepository.findOneOrFail({
        where: { id: id },
      });
      return purchase;
    } catch (err) {
      throw err;
    }
  }

  async update(
    id: number,
    updatePurchaseDto: UpdatePurchaseDto,
  ): Promise<Purchase> {
    let purchase = await this.purchaseRepository.findOneOrFail({
      where: { id: id },
    });
    purchase = { ...purchase, ...updatePurchaseDto };
    return this.purchaseRepository.save(purchase);
  }

  async remove(id: number): Promise<Purchase> {
    const purchase = await this.purchaseRepository.findOneOrFail({
      where: { id: id },
    });
    this.purchaseRepository.remove(purchase);
    return purchase;
  }
}
