import { Injectable } from '@nestjs/common';
import { ColorRepository } from './color.repository';

@Injectable()
export class ColorService {
  constructor(private readonly colorRepository: ColorRepository) {}

  findAll() {
    return this.colorRepository.findAll();
  }
}
