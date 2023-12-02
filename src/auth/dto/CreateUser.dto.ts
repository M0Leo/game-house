import { IsNotEmpty, IsString } from 'class-validator';

export default class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsNotEmpty()
  username: string;

  @IsString()
  password: string;
}
