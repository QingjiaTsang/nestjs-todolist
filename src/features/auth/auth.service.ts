import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { CommonUtility } from '../../core/utils/common.utility';

import { UserPayload } from './interfaces/payload.interface';

import { UserService } from '../user';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  public async validateUser(username: string, password: string) {
    const user = await this.userService.findUser({ username });

    const { hash } = await CommonUtility.encryptBySalt(
      password,
      user?.password?.salt,
    );

    if (!user || user?.password?.hash !== hash) {
      return null;
    }

    return user;
  }

  public async generateJwt(payload: UserPayload) {
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
