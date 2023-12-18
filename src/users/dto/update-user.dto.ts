import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { Membership } from 'src/memberships/entities/membership.entity';
import { Purchase } from 'src/purchases/entities/purchase.entity';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  name: string;
  firstname: string;
  address: string;
  postalcode: string;
  email: string;
  is_valid: boolean;
  memberships?: Membership[];
  purchases?: Purchase[];
}
