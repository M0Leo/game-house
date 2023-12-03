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
import { CreateGameDto } from './dto/CreateGame.dto';
import { GetGamesDto } from './dto/GetGamesDto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Game } from 'src/entities/games';
import { GameDto } from './dto/GameDto';

@ApiTags('games')
@Controller('games')
export class GamesController {
  constructor(private readonly gameService: GamesService) {}

  @ApiOperation({ summary: 'Get all games' })
  @ApiResponse({
    status: 200,
    description: 'Get all games',
    type: [GameDto],
  })
  @Get()
  async list(@Query() getGamesDto: GetGamesDto) {
    const games = await this.gameService.getGames(getGamesDto);
    return games;
  }

  @ApiOperation({ summary: 'Get game by id' })
  @ApiResponse({
    status: 200,
    description: 'Get game by id',
    type: GameDto,
  })
  @Get(':id')
  async getGame(@Param('id') id: string) {
    return this.gameService.game(parseInt(id));
  }

  @ApiOperation({ summary: 'Create game' })
  @ApiBody({
    description: 'Create game',
    type: CreateGameDto,
  })
  @ApiResponse({
    status: 201,
    description: 'Create game',
  })
  @Post()
  async createGame(@Body() data: CreateGameDto) {
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
