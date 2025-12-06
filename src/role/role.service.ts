import { Injectable } from '@nestjs/common';
import { RoleRepository } from './role.repository';

@Injectable()
export class RoleService {
  constructor(private readonly roleRepository: RoleRepository) {}

  findAll() {
    return this.roleRepository.findAll();
  }

  findOne(id: number) {
    return this.roleRepository.findById(id);
  }
}
