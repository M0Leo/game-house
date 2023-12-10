import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { GenresService } from './genres.service';

@Controller('genres')
export class GenresController {
  constructor(private readonly genresService: GenresService) {}

  @Get('/list')
  async getGenres() {
    const genres = await this.genresService.getGenres();
    return genres;
  }

  @Get(':id')
  async getGenre(@Param('id') id: number) {
    const genre = await this.genresService.getGenre(id);
    return genre;
  }

  @Post()
  async createGenre(@Body('name') name: string) {
    const genre = await this.genresService.createGenre(name);
    return genre;
  }

  @Put(':id')
  async updateGenre(@Param('id') id: number, @Param('name') name: string) {
    const genre = await this.genresService.updateGenre(id, name);
    return genre;
  }

  @Delete(':id')
  async deleteGenre(@Param('id') id: number) {
    const genre = await this.genresService.deleteGenre(id);
    return genre;
  }
}
