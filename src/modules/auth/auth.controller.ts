import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import LoginDto from './dto/Login.dto';
import CreateUserDto from './dto/CreateUser.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto);
  }

  @Post('login')
  signin(@Body() data: LoginDto) {
    console.log(data);
    return this.authService.login(data);
  }

  @Post('refresh')
  refresh(@Body() refresh: string) {
    return this.authService.refreshTokens(refresh);
  }
}
