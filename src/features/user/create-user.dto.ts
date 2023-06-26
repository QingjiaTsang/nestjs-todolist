import { IsEmail, IsEnum, MaxLength, MinLength } from 'class-validator';
import {
  USER_USERNAME_MIN_LEN,
  USER_USERNAME_MAX_LEN,
  USER_PASSWORD_MIN_LEN,
  USER_PASSWORD_MAX_LEN,
} from '../../common/constants/user.const';
import { Role } from '../../common/enums/role.enum';

export class CreateUserDto {
  @IsEmail()
  public readonly email: string;

  @MinLength(USER_USERNAME_MIN_LEN)
  @MaxLength(USER_USERNAME_MAX_LEN)
  public readonly username: string;

  @MinLength(USER_PASSWORD_MIN_LEN)
  @MaxLength(USER_PASSWORD_MAX_LEN)
  public readonly password: string;

  @IsEnum(Role)
  public readonly role: string;
}
