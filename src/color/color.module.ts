import { Module } from '@nestjs/common';
import { ColorService } from './color.service';
import { ColorRepository } from './color.repository';

@Module({
  controllers: [],
  providers: [ColorService, ColorRepository],
  exports: [ColorService, ColorRepository],
})
export class ColorModule {}
