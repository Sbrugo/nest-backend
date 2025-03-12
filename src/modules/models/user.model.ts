import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

@Schema({ timestamps: true, id: false })
export class User {
  @Prop({ required: true, unique: true, minlength: 3, maxlength: 30 })
  username!: string;

  @Prop({
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      'Please enter a valid email address',
    ],
  })
  email!: string;

  @Prop({
    required: true,
    minlength: 8,
    select: true,
  })
  password!: string;

  @Prop({
    type: String,
    enum: UserRole,
    default: UserRole.USER,
  })
  role?: UserRole;

  @Prop({ default: true })
  isActive?: boolean;

  @Prop({ type: Date })
  lastLogin?: Date;

  @Prop({
    minlength: 2,
    maxlength: 50,
  })
  firstName?: string;

  @Prop({
    minlength: 2,
    maxlength: 50,
  })
  lastName?: string;

  @Prop({
    required: false,
    validate: {
      validator: function (v: Date) {
        const today = new Date();
        const age = today.getFullYear() - v.getFullYear();
        const m = today.getMonth() - v.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < v.getDate())) {
          return age - 1 >= 13;
        }
        return age >= 13;
      },
      message: 'User must be at least 13 years old',
    },
  })
  dateOfBirth?: Date;

  @Prop({
    maxlength: 500,
  })
  bio?: string;

  @Prop({
    required: false,
    validate: {
      validator: function (v: string) {
        return /^(https?:\/\/.*\.(?:png|jpg|jpeg))$/i.test(v);
      },
      message: 'Avatar URL must be a valid image URL',
    },
  })
  avatarUrl?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
