import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    const isValidPassword = this.comparePassword(password, user.password);

    if (!isValidPassword) {
      throw new UnauthorizedException(
        `El usuario o la contraseña son incorrecta`,
      );
    }

    const payload = { email, sub: user.id_user };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async profile(id: string): Promise<any> {
    const user = await this.userService.findOne(id);

    if (!user){
      throw new NotFoundException('Usuario no encontrado');
    }

    return user;
  }

  private async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    const result = bcrypt.compare(password, hashedPassword);
    return await result;
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }
}
