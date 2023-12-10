import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Genre } from 'src/entities/genres';
import { In, Repository } from 'typeorm';

@Injectable()
export class GenresService {
  constructor(
    @InjectRepository(Genre)
    private readonly genresRepository: Repository<Genre>,
  ) {}

  async getGenres() {
    const genres = await this.genresRepository.find();
    return genres;
  }

  async getGenre(id: number) {
    const genre = await this.genresRepository.findOne({
      where: {
        id,
      },
    });
    return genre;
  }

  async createGenre(name: string) {
    const genre = this.genresRepository.create({ name });
    await this.genresRepository.save(genre);
    return genre;
  }

  async updateGenre(id: number, name: string) {
    const genre = await this.genresRepository.findOne({
      where: {
        id,
      },
    });
    genre.name = name;
    await this.genresRepository.save(genre);
    return genre;
  }

  async deleteGenre(id: number) {
    const genre = await this.genresRepository.findOne({
      where: {
        id,
      },
    });
    await this.genresRepository.remove(genre);
    return genre;
  }

  async getGenreByName(name: string) {
    const genre = await this.genresRepository.findOne({
      where: {
        name,
      },
    });
    return genre;
  }

  async getGenresByIds(ids: number[]) {
    const genres = await this.genresRepository.findBy({ id: In(ids) });
    return genres;
  }
}
