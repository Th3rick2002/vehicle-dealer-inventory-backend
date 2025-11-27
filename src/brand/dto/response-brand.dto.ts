import { ApiProperty } from '@nestjs/swagger';

export class BrandResponseDto {
  @ApiProperty({ example: 1 })
  id_brand: number;

  @ApiProperty({ example: 'Toyota' })
  name_brand: string;

  @ApiProperty({ example: 'Japón' })
  name_country: string;

  @ApiProperty({ example: '2024-01-15T10:30:00Z' })
  create_at: Date;
}

export class BrandDetailResponseDto extends BrandResponseDto {
  @ApiProperty({ example: 1 })
  id_country: number;

  @ApiProperty({ example: '2024-01-20T15:45:00Z', required: false })
  update_at?: Date;
}
