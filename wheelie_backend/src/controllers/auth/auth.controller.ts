import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { AuthService } from '@/modules/auth/auth.service';
import { RegisterDto } from '@/controllers/auth/dto/register.dto';
import { LoginDto } from '@/controllers/auth/dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Get('verify')
  verifyEmail(@Query('token') token: string) {
    return this.authService.verifyEmail(token);
  }

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }
}
