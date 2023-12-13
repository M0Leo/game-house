import { ApiProperty } from '@nestjs/swagger';

export default class GenreDto {
  @ApiProperty({ type: Number, example: 1 })
  id: number;

  @ApiProperty({ type: String, example: 'RPG' })
  name: string;
}
