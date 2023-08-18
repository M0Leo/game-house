import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Query,
  Delete,
} from '@nestjs/common';
import { GamesService } from './games.service';
import { CreateGameDto } from './dto/createGame.dto';
import { GetGamesDto } from './dto/GetGamesDto';

@Controller('games')
export class GamesController {
  constructor(private readonly gameService: GamesService) {}

  @Get()
  async getGames(@Query() getGamesDto: GetGamesDto) {
    const games = await this.gameService.getGames(getGamesDto);
    return games;
  }

  @Get(':id')
  async getGame(@Param('id') id: string) {
    return this.gameService.game(parseInt(id));
  }

  @Post()
  async addGame(@Body() data: CreateGameDto) {
    return this.gameService.create(data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return this.gameService.deleteGame(parseInt(id));
    } catch (error) {
      return error;
    }
  }
}
