import { Module } from '@nestjs/common';
import { GamesController } from './games.controller';
import { GamesService } from './games.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Genre } from 'src/entities/genres';
import { Platform } from 'src/entities/platform';
import { Game } from 'src/entities/games';

@Module({
  imports: [TypeOrmModule.forFeature([Game, Genre, Platform])],
  controllers: [GamesController],
  providers: [GamesService],
  exports: [GamesModule],
})
export class GamesModule {}
