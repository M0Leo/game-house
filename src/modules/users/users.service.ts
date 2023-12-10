import { Injectable } from '@nestjs/common';
import UserEntity from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import CreateUserDto from '../auth/dto/CreateUser.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async findOne(id: number) {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
    });
    return user;
  }

  async findOneByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
    });
    return user;
  }

  async create(createUserDto: CreateUserDto) {
    try {
      const { password } = createUserDto;
      const hashed = await bcrypt.hash(password, 10);
      const user = this.userRepository.create({
        ...createUserDto,
        password: hashed,
      });
      return this.userRepository.save(user);
    } catch (err) {
      throw new Error('Something went wrong');
    }
  }
}
