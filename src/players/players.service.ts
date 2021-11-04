import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ICreatePlayerDTO } from './dtos/ICreatePlayerDTO';
import { IUpdatePlayerDTO } from './dtos/IUpdatePlayerDTO';
import { Player } from './models/player.model';

@Injectable()
export class PlayersService {
  constructor(
    @InjectModel('Player')
    private playerModel: Model<Player>,
  ) {}

  public async show(): Promise<Player[]> {
    return await this.playerModel.find();
  }

  public async index(id: string): Promise<Player> {
    const player = await this.playerModel.findById(id);

    if (!player) {
      throw new NotFoundException('Player not found');
    }

    return player;
  }

  public async indexByEmail(email: string): Promise<Player> {
    const player = await this.playerModel.findOne({ email });

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
    const player_already_exist = await this.playerModel.findOne({ email });

    if (player_already_exist) {
      throw new BadRequestException('Player already exists');
    }

    const player_create = this.playerModel.create({
      name,
      email,
      phone_number,
    });

    return player_create;
  }

  public async update({
    id,
    name,
    email,
    phone_number,
  }: IUpdatePlayerDTO): Promise<Player> {
    const player_already_exist = await this.playerModel.findById(id);

    if (!player_already_exist) {
      throw new BadRequestException('Player already exists');
    }

    const player = await this.playerModel.findOneAndUpdate(
      {
        _id: player_already_exist._id,
      },
      {
        $set: { name, email, phone_number },
      },
      {
        new: true, // <- Return new object
      },
    );

    return player;
  }

  public async delete(id: string): Promise<void> {
    const player = await this.playerModel.findById(id);

    if (!player) {
      throw new NotFoundException('Player not found');
    }

    await this.playerModel.remove({ _id: id });
  }
}
