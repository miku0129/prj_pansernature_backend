import { PartialType } from '@nestjs/mapped-types';
import { CreatePurchaseDto } from './create-purchase.dto';

export class UpdatePurchaseDto extends PartialType(CreatePurchaseDto) {
  delivery_address?: string;
  delivery_postalcode?: string;
  is_valid: boolean;
}
