import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { UsersService } from './users.service';
import { JwtGuard } from '../auth/guards/auth.guard';
import { Roles } from 'src/decorators/role.decorator';
import { RolesGuard } from '../auth/guards/role.guard';
import { UserRole } from './users.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Get('all')
  async getAll(@Req() req: Request) {
    return req.user;
  }
}
