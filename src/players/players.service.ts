import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import { ICreatePlayerDTO } from './dtos/ICreatePlayerDTO';
import { IUpdatePlayerDTO } from './dtos/IUpdatePlayerDTO';
import { Player } from './model/player.model';

@Injectable()
export class PlayersService {
  private players: Player[] = [];

  public async show(): Promise<Player[]> {
    return this.players;
  }

  public async index(id: string): Promise<Player> {
    const player = this.players.find((player) => player._id === id);

    if (!player) {
      throw new NotFoundException('Player not found');
    }

    return player;
  }

  public async indexByEmail(email: string): Promise<Player> {
    const player = this.players.find((player) => player.email === email);

    if (!player) {
      throw new NotFoundException('Player not found');
    }

    return player;
  }

  public async create({
    name,
    email,
    phone_number,
  }: ICreatePlayerDTO): Promise<Player> {
    const player_already_exist = this.players.find(
      (player) => player.email === email,
    );

    if (player_already_exist) {
      throw new BadRequestException('Player already exists');
    }

    const player: Player = {
      _id: uuid(),
      name,
      email,
      phone_number,
      avatar: '',
      ranking: 'A',
      position_ranking: 12,
    };

    this.players.push(player);

    return player;
  }

  public async update({
    id,
    name,
    email,
    phone_number,
  }: IUpdatePlayerDTO): Promise<Player> {
    const player_index = this.players.findIndex((player) => player._id === id);

    if (player_index < 0) {
      throw new NotFoundException('Player not found');
    }

    this.players[player_index].name = name;
    this.players[player_index].email = email;
    this.players[player_index].phone_number = phone_number;

    return this.players[player_index];
  }

  public async delete(id: string): Promise<void> {
    const player_index = this.players.findIndex((player) => player._id === id);

    if (player_index < 0) {
      throw new NotFoundException('Player not found');
    }

    this.players.splice(player_index, 1);
  }
}
