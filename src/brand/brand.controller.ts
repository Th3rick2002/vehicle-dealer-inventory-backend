import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { BrandService } from './brand.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import {
  BrandDetailResponseDto,
  BrandResponseDto,
} from './dto/response-brand.dto';
import {
  ApiExtraModels,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Marcas')
@ApiExtraModels(CreateBrandDto, UpdateBrandDto)
@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva marca' })
  @ApiResponse({
    status: 201,
    description: 'Marca creada exitosamente',
    type: BrandDetailResponseDto,
  })
  @ApiResponse({
    status: 409,
    description: 'Ya existe una marca con ese nombre',
  })
  @ApiResponse({
    status: 400,
    description: 'El país especificado no existe',
  })
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createBrandDto: CreateBrandDto) {
    return this.brandService.create(createBrandDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las marcas' })
  @ApiResponse({
    status: 200,
    description: 'Lista de marcas obtenida exitosamente',
    type: [BrandResponseDto],
  })
  findAll() {
    return this.brandService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una marca específica por ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID de la marca' })
  @ApiResponse({
    status: 200,
    description: 'Marca encontrada',
    type: BrandDetailResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Marca no encontrada',
  })
  findOne(@Param('id') id: string) {
    return this.brandService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una marca existente' })
  @ApiParam({ name: 'id', type: Number, description: 'ID de la marca' })
  @ApiResponse({
    status: 200,
    description: 'Marca actualizada exitosamente',
    type: BrandDetailResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Marca no encontrada',
  })
  update(@Param('id') id: string, @Body() updateBrandDto: UpdateBrandDto) {
    return this.brandService.update(+id, updateBrandDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una marca (soft delete)' })
  @ApiParam({ name: 'id', type: Number, description: 'ID de la marca' })
  @ApiResponse({
    status: 200,
    description: 'Marca eliminada exitosamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Marca no encontrada',
  })
  remove(@Param('id') id: string) {
    return this.brandService.remove(+id);
  }
}
