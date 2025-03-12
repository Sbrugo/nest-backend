import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto, LoginDto } from '@dto/user.dto';
import { UsersService } from '@services/users.service';
import * as bcryptjs from 'bcryptjs';
import { UserRole } from '@models/user.model';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async register(createUserDto: CreateUserDto) {
    const { password, email, username } = createUserDto;
    const user = await this.usersService.findByEmail(email);
    if (user) {
      throw new BadRequestException('Email already exists');
    }
    const hashedPassword = await bcryptjs.hash(password, 10);
    await this.usersService.createUser({
      username,
      email,
      password: hashedPassword,
      role: UserRole.USER,
    });
    return {
      message: 'User created successfully',
    };
  }

  async login(loginDto: LoginDto) {
    const { password, email } = loginDto;
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid email');
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }
    return {
      email: user.email,
      message: 'Login succesful',
    };
  }
}
