import {
  IsString,
  IsDateString,
  IsNumber,
  Min,
  Max,
  Length,
} from 'class-validator';

export class CreateGameDto {
  @IsString()
  title: string;

  @IsDateString()
  release_date: Date;

  @IsNumber()
  @Min(0)
  @Max(10)
  rating: number;

  @IsString()
  publisher: string;

  @IsString()
  @Length(20, 100)
  descreption: string;
}
