import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ModelService } from './model.service';
import { CreateModelDto } from './dto/create-model.dto';
import { UpdateModelDto } from './dto/update-model.dto';
import {
  ApiExtraModels,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ColorService } from '../color/color.service';
import { CreateColorDto } from '../color/dto/create-color.dto';
import { CountryService } from '../country/country.service';
import { CreateCountryDto } from '../country/dto/create-country.dto';

@ApiTags('Modelos')
@ApiExtraModels(CreateModelDto, UpdateModelDto)
@Controller('model')
export class ModelController {
  constructor(
    private readonly modelService: ModelService,
    private readonly colorService: ColorService,
    private readonly CountryService: CountryService,
  ) {}

  @ApiOperation({ summary: 'Crear un nuevo modelo' })
  @ApiResponse({
    status: 201,
    description: 'Modelo creado exitosamente',
    type: CreateModelDto,
  })
  @ApiResponse({
    status: 409,
    description: 'Ya existe un modelo con ese nombre',
  })
  @ApiResponse({
    status: 400,
    description: 'El pais especificado no existe',
  })
  @ApiResponse({
    status: 400,
    description: 'La marca especificada no existe',
  })
  @Post()
  create(@Body() createModelDto: CreateModelDto) {
    return this.modelService.create(createModelDto);
  }

  @ApiOperation({ summary: 'Obtener todos los modelos' })
  @ApiResponse({
    status: 200,
    description: 'Lista de modelos obtenida exitosamente',
    type: [CreateModelDto],
  })
  @Get()
  findAll() {
    return this.modelService.findAll();
  }

  @ApiOperation({ summary: 'Obtener todos los colores de los modelos' })
  @ApiResponse({
    status: 200,
    description: 'Lista de colores obtenida exitosamente',
    type: [CreateColorDto],
  })
  @Get('colors')
  findColorsModels() {
    return this.colorService.findAll();
  }

  @ApiOperation({ summary: 'Obtener todos los paises de los modelos' })
  @ApiResponse({
    status: 200,
    description: 'Lista de paises obtenida exitosamente',
    type: [CreateCountryDto],
  })
  @Get('countries')
  findCountryModels() {
    return this.CountryService.findAll();
  }

  @ApiOperation({ summary: 'Obtener un vehiculo por su id' })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.modelService.findOne(+id);
  }

  @ApiOperation({
    summary: 'Obtener un modelo por el nombre de la marca especificada',
  })
  @Get('brad/:name')
  findByBrand(@Param('name') name: string) {
    return this.modelService.findByName(name);
  }

  @ApiOperation({ summary: 'Actualizar un modelo existente' })
  @ApiResponse({
    status: 200,
    description: 'Modelo actualizado exitosamente',
    type: UpdateModelDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Modelo no encontrado',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateModelDto: UpdateModelDto) {
    return this.modelService.update(+id, updateModelDto);
  }

  @ApiOperation({ summary: 'Eliminar un modelo (soft delete)' })
  @ApiResponse({
    status: 200,
    description: 'Modelo eliminado exitosamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Modelo no encontrado',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.modelService.remove(+id);
  }
}
