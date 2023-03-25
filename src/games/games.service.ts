import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';
import { CreateGameDto } from './dto/createGame.dto';
import { UpdateGameDto } from './dto/updateGameDto';

@Injectable()
export class GamesService {
  constructor(private prisma: PrismaService) {}

  async game(id: number) {
    return this.prisma.game.findUnique({
      where: { id },
    });
  }

  async getGames(
    skip?: number,
    take?: number,
    orderBy?: { [key: string]: 'asc' | 'desc' },
    where?: any,
    cursor?: any,
  ) {
    return this.prisma.game.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: { genres: { select: { name: true } } },
    });
  }

  async createGame(createGameDto: CreateGameDto, genreIds: number[]) {
    const { release_date } = createGameDto;
    const data = {
      ...createGameDto,
      release_date: new Date(release_date).toISOString(),
    };

    if (genreIds) {
      data['genres'] = {
        connect: genreIds.map((id) => ({ id })),
      };
    }

    const game = await this.prisma.game.create({
      data,
    });

    return game;
  }

  async updateGame(
    id: number,
    updateGameDto: UpdateGameDto,
    genreIds: number[],
  ) {
    const game = await this.prisma.game.update({
      where: { id },
      data: {
        ...updateGameDto,
        genres: {
          connect: genreIds.map((id) => ({ id })),
        },
      },
      include: { genres: true },
    });

    return game;
  }

  async deleteGame(id: number) {
    return this.prisma.game.delete({
      where: { id },
    });
  }
}
