import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Login de usuario' })
  @Post('login')
  signIn(@Body() loginDTO: LoginDto) {
    return this.authService.signIn(loginDTO.email, loginDTO.password);
  }

  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Obtener perfil de usuario' })
  @ApiBearerAuth('JWT-auth')
  @Get('profile')
  getProfile(@Request() req) {
    const userId = req.user.sub;
    return this.authService.profile(userId);
  }
}
