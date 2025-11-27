import { PartialType } from '@nestjs/mapped-types';
import { CreateBrandDto } from './create-brand.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateBrandDto extends PartialType(CreateBrandDto) {
  @ApiPropertyOptional({ example: 'Ford' })
  name_brand?: string;

  @ApiPropertyOptional({ example: 1 })
  id_country?: number;
}
