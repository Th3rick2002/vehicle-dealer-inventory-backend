import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';
import { RoleService } from '../role/role.service';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly roleService: RoleService
    ) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.userRepository.findUserByEmail(createUserDto.email);

    if (user) {
      throw new ConflictException('El usuario con este correo ya existe');
    }

    const role = await this.roleService.findOne(createUserDto.role);

    if (!role) {
      throw new NotFoundException('El rol no existe.')
    }

    return this.userRepository.create(createUserDto);
  }

  findAll() {
    return this.userRepository.findAll();
  }

  async findOne(id: string) {
    return await this.userRepository.findUser(id);
  }

  findByEmail(email: string) {
    return this.userRepository.findUserByEmail(email);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findUser(id);

    if (!user ) {
      throw new NotFoundException('El usuario no existe.');
    }

    if (updateUserDto.email) {
      const validEmialInOtherUser = await this.userRepository.emailExistsForOtherUser(updateUserDto.email, id);

      if (validEmialInOtherUser) {
        throw new ConflictException('El correo ya existe en otro usuario.');
      }
    }

    if (updateUserDto.role) {
      const role = await this.roleService.findOne(updateUserDto.role);

      if (!role) {
        throw new NotFoundException('El rol no existe.')
      }
    }

  }

  async remove(id: string) {
    const user = await this.userRepository.findUser(id);

    if (!user ) {
      throw new NotFoundException('El usuario no existe.');
    }

    return this.userRepository.softDelete(id);
  }
}
