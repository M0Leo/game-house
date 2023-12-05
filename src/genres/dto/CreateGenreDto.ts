import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export default class CreateGenre {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'Genre name', example: 'Action' })
  name: string;
}
