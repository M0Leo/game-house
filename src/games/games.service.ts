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

  async getGameById(id: number) {
    const game = await this.gameRepository.findOneByOrFail({ id });
    return game;
  }

  async getGames(getGamesDto: GetGamesDto) {
    const { skip = 0, take = 10, orderBy } = getGamesDto;
    const [games, total] = await this.gameRepository.findAndCount({
      relations: ['genres', 'platform'],
      skip,
      take,
      order: {
        release_date: orderBy,
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
    const { genreIds, platformIds, ...data } = body;
    const game = this.gameRepository.create(data);
    if (genreIds) {
      game.genres = await this.genreRepository.findBy({ id: In(genreIds) });
    }
    if (platformIds) {
      game.platform = await this.genreRepository.findBy({
        id: In(platformIds),
      });
    }
    await this.gameRepository.save(game);
    return game;
  }

  async updateGame(updateGameDto: UpdateGameDto): Promise<boolean> {
    const game = await this.gameRepository.update(
      updateGameDto.id,
      updateGameDto,
    );
    return game.affected > 0;
  }

  async removeGenreFromGame(id: number, genreId: number) {
    const game = await this.getGameById(id);
    if (!game) {
      throw new NotFoundException('Game with id' + id);
    }
    const genre = await this.genreRepository.findOneBy({ id: genreId });
    if (!genre) {
      throw new NotFoundException('Genre with id' + genreId);
    }
    game.genres = game.genres.filter((g) => g.id !== genreId);
    await this.gameRepository.save(game);
    return game;
  }

  async deleteGame(id: number): Promise<boolean> {
    const game = await this.gameRepository.delete(id);
    return game.affected > 0;
  }
}
