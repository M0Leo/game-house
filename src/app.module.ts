import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getTypeOrmConfig } from './config/typeorm.config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { GamesModule } from './modules/games/games.module';
import { UsersModule } from './modules/users/users.module';
import { GenresModule } from './modules/genres/genres.module';
import { AuthModule } from './modules/auth';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    GamesModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: getTypeOrmConfig,
      inject: [ConfigService],
    }),
    UsersModule,
    AuthModule,
    EventEmitterModule.forRoot(),
    GenresModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
