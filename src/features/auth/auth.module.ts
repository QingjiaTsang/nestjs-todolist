import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

import { ConfigModule, ConfigService } from '@nestjs/config';

import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { UserModule } from '../user';

// todo: 缕一缕这一块在具体的流程，明晰清楚imports这些模块的用途
@Module({
  imports: [
    // explanation from copilot:
    // PassportModule: 用于验证用户的身份
    // JwtModule: 用于生成token
    // UserModule: 用于获取用户信息
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const secret = config.get('secrets.jwt');
        return {
          secret,
          signOptions: {
            expiresIn: '3600s',
          },
        };
      },
    }),
    UserModule,
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
