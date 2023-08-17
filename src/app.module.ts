import { Module } from '@nestjs/common';
import { GamesModule } from './games/games.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { GenresModule } from './genres/genres.module';
import { typeOrmConfig } from './config/typeorm.config';

@Module({
  imports: [
    GamesModule,
    TypeOrmModule.forRoot({
      ...typeOrmConfig,
    }),
    GenresModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
