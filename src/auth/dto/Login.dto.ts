import { IsNotEmpty, IsString } from 'class-validator';

export default class oginDto {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
