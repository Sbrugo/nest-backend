import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { User, UserDocument } from '@models/user.model';
import { CreateUserDto, UpdateUserDto } from '@dto/user.dto';
@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(user: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(user);
    return createdUser.save();
  }

  async findById(id: string): Promise<User> {
    if (!mongoose.isValidObjectId(id)) {
      throw new BadRequestException('Invalid ID format');
    }
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.userModel.findOne({ email }).exec();
    if (user) {
      return user;
    }
    return null;
  }

  async findAllUsers(): Promise<User[]> {
    return this.userModel.find().select('-password').exec();
  }

  async updateUser(id: string, user: UpdateUserDto): Promise<User> {
    if (!mongoose.isValidObjectId(id)) {
      throw new BadRequestException('Invalid ID format');
    }
    const updatedUser = await this.userModel
      .findByIdAndUpdate(id, user, {
        new: true,
      })
      .exec();
    if (!updatedUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return updatedUser;
  }

  async patchUser(id: string, user: CreateUserDto): Promise<User> {
    if (!mongoose.isValidObjectId(id)) {
      throw new BadRequestException('Invalid ID format');
    }
    const patchedUser = await this.userModel
      .findByIdAndUpdate(id, user, {
        new: true,
      })
      .exec();
    if (!patchedUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return patchedUser;
  }

  async deleteUser(id: string): Promise<User> {
    if (!mongoose.isValidObjectId(id)) {
      throw new BadRequestException('Invalid ID format');
    }
    const deletedUser = await this.userModel.findByIdAndDelete(id).exec();
    if (!deletedUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return deletedUser;
  }

  async deactivateUser(id: string): Promise<User> {
    if (!mongoose.isValidObjectId(id)) {
      throw new BadRequestException('Invalid ID format');
    }
    const deactivatedUser = await this.userModel
      .findByIdAndUpdate(
        id,
        { active: false },
        {
          new: true,
        },
      )
      .exec();
    if (!deactivatedUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return deactivatedUser;
  }

  async countUsers(): Promise<number> {
    return this.userModel.countDocuments().exec();
  }
}
