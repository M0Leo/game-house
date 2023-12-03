import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Game } from '../entities/games';
import { In, Repository } from 'typeorm';
import { CreateGameDto } from './dto/CreateGame.dto';
import { GetGamesDto } from './dto/GetGamesDto';
import { UpdateGameDto } from './dto/UpdateGameDto';
import { Genre } from 'src/entities/genres';

@Injectable()
export class GamesService {
  constructor(
    @InjectRepository(Game)
    private gameRepository: Repository<Game>,
    @InjectRepository(Genre)
    private genreRepository: Repository<Genre>,
  ) {}

  async game(id: number) {
    const game = await this.gameRepository.findOneBy({ id });
    return game;
  }

  async getGames(getGamesDto: GetGamesDto) {
    const [games, total] = await this.gameRepository.findAndCount({
      select: {
        platform: {
          name: true,
        },
        genres: {
          name: true,
        },
      },
      relations: {
        platform: true,
        genres: true,
      },
      skip: getGamesDto.skip || 0,
      take: getGamesDto.take || 10,
      order: {
        release_date: getGamesDto.orderBy,
      },
    });
    return {
      data: games,
      count: total,
    };
  }

  async getGamesByGenre(genre: string) {
    const games = await this.gameRepository.find({
      where: {
        genres: {
          name: genre,
        },
      },
    });
    return games;
  }

  async getGamesByPlatform(platform: string) {
    const games = await this.gameRepository.find({
      where: {
        platform: {
          name: platform,
        },
      },
    });
    return games;
  }

  async create(body: CreateGameDto) {
    try {
      const { genreIds, platformIds, ...data } = body;
      const game = await this.gameRepository.create(data);
      game.genres = await this.genreRepository.findBy({ id: In(genreIds) });
      game.platform = await this.genreRepository.findBy({
        id: In(platformIds),
      });
      await this.gameRepository.save(game);
      return game;
    } catch (error) {
      throw new InternalServerErrorException('Failed to create');
    }
  }

  async updateGame(updateGameDto: UpdateGameDto) {
    try {
      const game = await this.gameRepository.update(
        updateGameDto.id,
        updateGameDto,
      );
      if (game.affected === 0) {
        throw new NotFoundException('Game with id' + updateGameDto.id);
      }
      return game;
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to update the specefied game',
      );
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
