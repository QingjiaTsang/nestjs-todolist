import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';

import { USER_MODEL_TOKEN, UserDocument } from '../../common/model/user.schema';

import { CommonUtilitiy } from '../../core/utils/common.utility';
import { CreateUserDto } from './create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(USER_MODEL_TOKEN)
    private readonly userModel: Model<UserDocument>,
  ) {}

  public async createUser(user: CreateUserDto) {
    const { username, email, role } = user;
    const password = CommonUtilitiy.encryptBySalt(user.password);
    const document = await this.userModel.create({
      username,
      password,
      email,
      role,
    });
    return document?.toJSON();
  }

  public async findUser(filter: FilterQuery<UserDocument>, select?: any) {
    /** find method Finds one document. */
    /** select method Specifies which document fields to include or exclude (also known as the query "projection") */
    const query = this.userModel.findOne(filter).select(select);
    /** exec method Executes the query */
    const document = await query.exec();
    return document?.toJSON();
  }

  public async hasUser() {
    const count = await this.userModel.estimatedDocumentCount().exec();
    return count > 0;
  }
}
