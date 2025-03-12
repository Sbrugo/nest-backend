import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UsersService } from '@services/users.service';
import { CreateUserDto, UpdateUserDto } from '@dto/user.dto';
import { User } from '@models/user.model';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  createUser(@Body() user: CreateUserDto) {
    return this.userService.createUser(user);
  }

  @Get('email')
  findByEmail(@Query('email') email: string) {
    return this.userService.findByEmail(email);
  }

  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAllUsers();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.userService.findById(id);
  }

  @Patch(':id')
  updateUser(@Param('id') id: string, @Body() user: UpdateUserDto) {
    return this.userService.updateUser(id, user);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }

  @Patch(':id/deactivate')
  deactivateUser(@Param('id') id: string) {
    return this.userService.deactivateUser(id);
  }

  @Get('count')
  countUsers() {
    return this.userService.countUsers();
  }
}
