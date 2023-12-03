import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import CreateUserDto from './dto/CreateUser.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) { }

  async validateUser(email: string, password: string) {
    const user = await this.userService.findOneByEmail(email);
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async validateUserById(id: number) {
    const user = await this.userService.findOne(id);
    if (user) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async refreshTokens(refreshToken: any) {
    try {
      const payload = { sub: refreshToken.id };
      const user = await this.validateUserById(payload.sub);
      if (!user) {
        return null;
      }
      const newAccessToken = this.jwtService.sign(payload);
      return {
        access_token: newAccessToken,
      };
    } catch (err) {
      return console.log(err);
    }
  }

  async login(user: any) {
    const payload = { sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: this.jwtService.sign(payload, {
        expiresIn: '7d',
      }),
    };
  }

  async signUp(authDto: CreateUserDto) {
    try {
      const user = await this.userService.create(authDto);
      const payload = { sub: user.id };
      return {
        access_token: this.jwtService.sign(payload),
      };
    } catch (err) {
      console.log(err);
    }
  }
}
