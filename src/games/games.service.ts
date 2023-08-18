import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Game } from './games.entity';
import { Repository } from 'typeorm';
import { CreateGameDto } from './dto/createGame.dto';
import { GetGamesDto } from './dto/GetGamesDto';

@Injectable()
export class GamesService {
  constructor(
    @InjectRepository(Game)
    private gameRepository: Repository<Game>,
  ) {}

  async game(id: number) {
    const game = await this.gameRepository.findOneBy({ id });
    return game;
  }

  async getGames(getGamesDto: GetGamesDto) {
    const games = await this.gameRepository.find(getGamesDto);
    return games;
  }

  async create(body: CreateGameDto) {
    try {
      const game = await this.gameRepository.create(body);
      return await this.gameRepository.save(game);
    } catch (error) {
      throw new InternalServerErrorException('Failed to create');
    }
  }

  async deleteGame(id: number) {
    try {
      const game = await this.gameRepository.delete(id);
      if (game.affected === 0) {
        throw new NotFoundException('Game with id' + id);
      }
      return game;
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to remove the specefied game',
      );
    }
  }
}
