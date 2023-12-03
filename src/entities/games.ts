import { IsOptional } from 'class-validator';
import { Genre } from 'src/entities/genres';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Platform } from './platform';

@Entity()
export class Game {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  release_date: Date;

  @Column()
  publisher: string;

  @Column({ default: null })
  @IsOptional()
  description: string;

  @Column({ default: null })
  @IsOptional()
  cover_image_url: string;

  @ManyToMany(() => Platform, (platform) => platform.games)
  @JoinTable()
  @IsOptional()
  platform: Platform[];

  @ManyToMany(() => Genre, (genre) => genre.games)
  @JoinTable()
  @IsOptional()
  genres: Genre[];
}
