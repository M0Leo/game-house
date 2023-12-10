import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import CreateUserDto from './dto/CreateUser.dto';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import User from '../users/users.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userService.findOneByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    return user;
  }

  async validateUserById(id: number): Promise<User> {
    const user = await this.userService.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async refreshTokens(refreshToken: any): Promise<{ access_token: string }> {
    const payload = { sub: refreshToken.id };
    const user = await this.validateUserById(payload.sub);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    const newAccessToken = this.jwtService.sign(payload);
    return {
      access_token: newAccessToken,
    };
  }

  async login(
    data: any,
  ): Promise<{ access_token: string; refresh_token: string }> {
    const user = await this.validateUser(data.email, data.password);
    const payload = { sub: user.id };
    return {
      access_token: this.jwtService.sign(payload, {
        expiresIn: '15m',
      }),
      refresh_token: this.jwtService.sign(payload, {
        expiresIn: '7d',
      }),
    };
  }

  async signUp(authDto: CreateUserDto): Promise<{ access_token: string }> {
    const user = await this.userService.create(authDto);
    const payload = { sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
