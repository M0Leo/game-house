import { ApiProperty } from '@nestjs/swagger';

export class GameDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'The Witcher 3: Wild Hunt' })
  title: string;

  @ApiProperty({ example: '2015-05-18T00:00:00.000Z' })
  release_date: Date;

  @ApiProperty({ example: 'CD Projekt Red' })
  publisher: string;

  @ApiProperty({
    example:
      'You are Geralt of Rivia, mercenary monster slayer. Before you stands a war-torn, monster-infested continent you can explore at will. Your current contract? Tracking down Ciri — the Child of Prophecy, a living weapon that can alter the shape of the world.',
  })
  description: string;

  @ApiProperty({
    example: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1r2t.jpg',
  })
  cover_image_url: string;
}
