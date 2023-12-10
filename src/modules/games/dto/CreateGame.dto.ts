import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsDateString,
  Length,
  IsArray,
  IsOptional,
} from 'class-validator';

export class CreateGameDto {
  @IsString()
  @ApiProperty({ description: 'The title of the game' })
  title: string;

  @IsDateString()
  @ApiProperty({ description: 'The release date of the game' })
  release_date: Date;

  @IsString()
  @ApiProperty({ description: 'The publisher of the game' })
  publisher: string;

  @IsString()
  @Length(20, 100)
  @ApiProperty({
    description: 'The description of the game (between 20 and 100 characters)',
  })
  description: string;

  @IsArray()
  @IsOptional()
  @ApiProperty({
    description: 'The genres of the game',
    type: [Number],
    example: [1, 2, 3],
  })
  genreIds: number[];

  @IsArray()
  @IsOptional()
  @ApiProperty({
    description: 'The platforms of the game',
    type: [Number],
    example: [1, 2, 3],
  })
  platformIds: number[];
}
