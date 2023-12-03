import { Module } from '@nestjs/common';
import { GamesController } from './games.controller';
import { GamesService } from './games.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from '../entities/games';
import { Genre } from 'src/entities/genres';
import { Platform } from 'src/entities/platform';

@Module({
  imports: [TypeOrmModule.forFeature([Game, Genre, Platform])],
  controllers: [GamesController],
  providers: [GamesService],
  exports: [GamesModule],
})
export class GamesModule {}
