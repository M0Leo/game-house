import { IsOptional } from 'class-validator';
import { Genre } from 'src/genres/genres.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Game {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  release_date: Date;

  @Column()
  rating: number;

  @Column()
  publisher: string;

  @Column({ default: null })
  @IsOptional()
  description: string;

  @Column({ default: null })
  @IsOptional()
  cover_image_url: string;

  @ManyToMany(() => Genre, (genre) => genre.games)
  @JoinTable()
  @IsOptional()
  genres: Genre[];
}
