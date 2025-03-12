import { Module } from '@nestjs/common';
import { UsersController } from '@controllers/users.controller';
import { UsersService } from '@services/users.service';
import { User, UserSchema } from '@models/user.model';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  exports: [UsersService],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
