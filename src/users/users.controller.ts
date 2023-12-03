import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { User } from 'src/decorators/user.decorator';
import UserEntity from './users.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }
  @UseGuards(AuthGuard)
  @Get('me')
  async getMe(@User() user: UserEntity) {
    return user;
  }

  @Get('all')
  async getAll(@Req() req: Request) {
    return req.user;
  }
}
