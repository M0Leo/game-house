import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { GenresService } from './genres.service';
import { ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/role.guard';
import { UserRole } from '../users/users.entity';
import { Roles } from 'src/decorators/role.decorator';
import CreateGenre from './dto/CreateGenreDto';

@ApiTags('genres')
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

  @UseGuards(JwtGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Post()
  async createGenre(@Body() createGenre: CreateGenre) {
    const genre = await this.genresService.createGenre(createGenre);
    return genre;
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Put(':id')
  async updateGenre(@Param('id') id: number, @Param('name') name: string) {
    const genre = await this.genresService.updateGenre(id, name);
    return genre;
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Delete(':id')
  async deleteGenre(@Param('id') id: number) {
    const genre = await this.genresService.deleteGenre(id);
    return genre;
  }
}
