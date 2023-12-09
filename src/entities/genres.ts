import { Game } from 'src/entities/games';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Genre {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Game, (game) => game.genres, { cascade: true })
  games: Game[];
}
