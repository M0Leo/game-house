import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { GamesService } from './games.service';
import { Game, Prisma } from '@prisma/client';
import { CreateGameDto } from './dto/createGame.dto';
import { UpdateGameDto } from './dto/updateGameDto';
import { GetGamesDto } from './dto/GetGamesDto';

@Controller('games')
export class GamesController {
  constructor(private readonly gameService: GamesService) {}

  @Get()
  @Get()
  async getGames(@Body() getGamesDto: GetGamesDto): Promise<Game[]> {
    const games = await this.gameService.getGames(
      getGamesDto.skip,
      getGamesDto.take,
      getGamesDto.orderBy,
      getGamesDto.where,
      getGamesDto.cursor,
    );
    return games;
  }
  @Get(':id')
  async getGame(@Param('id') id: string) {
    return this.gameService.game(parseInt(id));
  }

  @Post()
  async addGame(
    @Body() data: CreateGameDto,
    @Body('genreIds') genreIds: number[],
  ) {
    return this.gameService.createGame(data, genreIds);
  }

  @Put(':id')
  async updateGame(
    @Param('id') id: string,
    @Body() updateGameDto: UpdateGameDto,
    @Body('genreIds') genreIds: number[],
  ) {
    return this.gameService.updateGame(parseInt(id), updateGameDto, genreIds);
  }

  @Delete(':id')
  async deleteGame(@Param('id') id: number): Promise<Game> {
    const game = await this.gameService.deleteGame(id);
    return game;
  }
}
