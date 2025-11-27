import { PartialType } from '@nestjs/mapped-types';
import { CreateColorDto } from './create-color.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateColorDto extends PartialType(CreateColorDto) {
  @ApiPropertyOptional({ example: 'Rojo' })
  name_color?: string;
}
