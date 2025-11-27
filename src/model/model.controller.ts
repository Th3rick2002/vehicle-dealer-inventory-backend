import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
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

@ApiTags('Modelos')
@ApiExtraModels(CreateModelDto, UpdateModelDto)
@Controller('model')
export class ModelController {
  constructor(private readonly modelService: ModelService) {}

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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.modelService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateModelDto: UpdateModelDto) {
    return this.modelService.update(+id, updateModelDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.modelService.remove(+id);
  }
}
