import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Query,
  Delete,
  Put,
  UseGuards,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { GamesService } from './games.service';
import { CreateGameDto } from './dto/CreateGame.dto';
import { GetGamesDto } from './dto/GetGamesDto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GameDto } from './dto/GameDto';
import { UpdateGameDto } from './dto/UpdateGameDto';
import { Roles } from 'src/decorators/role.decorator';
import { JwtGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/role.guard';
import { UserRole } from '../users/users.entity';

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
  async getGame(@Param('id') id: number) {
    const game = await this.gameService.getGameById(id);
    return game;
  }

  @ApiOperation({ summary: 'Create game' })
  @ApiBody({
    type: CreateGameDto,
  })
  @ApiResponse({
    status: 201,
  })
  @ApiBearerAuth()
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Post()
  async createGame(@Body() data: CreateGameDto) {
    try {
      return await this.gameService.create(data);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Put()
  async updateGame(@Body() data: UpdateGameDto) {
    try {
      const game = await this.gameService.getGameById(data.id);
      if (!game) throw new NotFoundException(`Game with id ${data.id} found`);
      await this.gameService.updateGame(data);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const game = await this.gameService.getGameById(parseInt(id));
      if (!game) throw new NotFoundException(`Game with id ${id} found`);
      await this.gameService.deleteGame(game.id);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
