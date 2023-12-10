import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateGameDto } from './dto/CreateGame.dto';
import { GetGamesDto } from './dto/GetGamesDto';
import { UpdateGameDto } from './dto/UpdateGameDto';
import { Genre } from 'src/entities/genres';
import { NotFoundIdException } from 'src/errors/notFoundId.exception';
import { Game } from 'src/entities/games';

@Injectable()
export class GamesService {
  constructor(
    @InjectRepository(Game)
    private gameRepository: Repository<Game>,
    @InjectRepository(Genre)
    private genreRepository: Repository<Genre>,
  ) {}

  async getGameById(id: number) {
    const game = await this.gameRepository.findOne({
      where: { id },
      relations: ['genres', 'platform'],
    });
    if (!game) throw new NotFoundIdException(id);
    return game;
  }

  async getGames(getGamesDto: GetGamesDto) {
    const { skip = 0, take = 10, orderBy, genre, platform } = getGamesDto;

    const [games, total] = await this.gameRepository.findAndCount({
      relations: ['genres', 'platform'],
      where: {
        ...(genre && {
          genres: {
            name: genre,
          },
        }),
        ...(platform && {
          platform: {
            name: platform,
          },
        }),
      },
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

  async addGenreToGame(id: number, genreId: number) {
    const game = await this.getGameById(id);
    if (!game) {
      throw new NotFoundException('Game with id' + id);
    }
    const genre = await this.genreRepository.findOneBy({ id: genreId });
    if (!genre) {
      throw new NotFoundException('Genre with id' + genreId);
    }
    game.genres.push(genre);
    await this.gameRepository.save(game);
    return game;
  }

  async removeGenreFromGame(id: number, genreId: number) {
    try {
      const game = await this.getGameById(id);
      if (!game) {
        throw new NotFoundException('Game with id' + id);
      }
      const genre = await this.genreRepository.findOneBy({ id: genreId });
      if (!genre) {
        throw new NotFoundException('Genre with id' + genreId);
      }
      game.genres = game.genres?.filter((g) => g.id !== genreId);
      await this.gameRepository.save(game);
      return game;
    } catch (error) {
      throw new Error(error);
    }
  }

  async addPlatformToGame(id: number, platformId: number) {
    const game = await this.getGameById(id);
    if (!game) {
      throw new NotFoundException('Game with id' + id);
    }
    const platform = await this.genreRepository.findOneBy({ id: platformId });
    if (!platform) {
      throw new NotFoundException('Platform with id' + platformId);
    }
    game.platform.push(platform);
    await this.gameRepository.save(game);
    return game;
  }

  async removePlatformFromGame(id: number, platformId: number) {
    const game = await this.getGameById(id);
    if (!game) {
      throw new NotFoundException('Game with id' + id);
    }
    const platform = await this.genreRepository.findOneBy({ id: platformId });
    if (!platform) {
      throw new NotFoundException('Platform with id' + platformId);
    }
    game.platform = game.platform.filter((p) => p.id !== platformId);
    await this.gameRepository.save(game);
    return game;
  }

  async deleteGame(id: number): Promise<boolean> {
    const game = await this.gameRepository.delete(id);
    return game.affected > 0;
  }
}
