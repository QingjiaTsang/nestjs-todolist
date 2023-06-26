import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './user.service';
import { UserDefinition } from '../../common/model/user.schema';

@Module({
  imports: [MongooseModule.forFeature([UserDefinition])],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
