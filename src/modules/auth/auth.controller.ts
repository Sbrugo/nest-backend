import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto, LoginDto } from '@dto/user.dto';
import { AuthService } from '@auth/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
