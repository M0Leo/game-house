import { IsString, IsDate, IsNumber, IsNotEmpty } from 'class-validator';

export class UpdateGameDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsDate()
  release_date: Date | string;

  @IsNumber()
  rating: number;

  @IsString()
  @IsNotEmpty()
  publisher: string;
}
