import {
  ModelDefinition,
  Prop,
  raw,
  Schema,
  SchemaFactory,
} from '@nestjs/mongoose';
import { Document } from 'mongoose';

import {
  USER_USERNAME_MAX_LEN,
  USER_USERNAME_MIN_LEN,
} from '../constants/user.const';
import { Role } from '../enums/role.enum';

export type UserDocument = User & Document;

@Schema({ versionKey: false }) // versionKey: false => 不要自動產生 __v
export class User {
  @Prop({
    required: true,
    minlength: USER_USERNAME_MIN_LEN,
    maxlength: USER_USERNAME_MAX_LEN,
  })
  username: string;

  @Prop({
    required: true,
  })
  email: string;

  @Prop({
    required: true,
    type: raw({
      // raw 是用来嵌套对象的
      hash: String,
      salt: String,
    }),
  })
  password: { hash: string; salt: string };

  @Prop({
    required: true,
    enum: Role, // enum 是用来限制字段值的
    default: Role.MEMBER,
  })
  role: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);

export const USER_MODEL_TOKEN = User.name;

export const UserDefinition: ModelDefinition = {
  name: USER_MODEL_TOKEN,
  schema: UserSchema,
};
