import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Game } from './games';

@Entity()
export class Platform {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Game, (game) => game.platform, { cascade: true })
  games: Game[];
}
