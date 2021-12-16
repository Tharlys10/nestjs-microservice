import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from '../categories/models/category.model';
import { Player } from '../players/models/player.model';
import { ICreateChallengeDTO } from './dtos/ICreateChallengeDTO';
import { Challenge, ChallengeStatus } from './models/challenge.model';

@Injectable()
export class ChallengesService {
  constructor(
    @InjectModel('Challenge')
    private readonly challengeModel: Model<Challenge>,
    @InjectModel('Player')
    private readonly playerModel: Model<Player>,
    @InjectModel('Category')
    private readonly categoryModel: Model<Category>,
  ) {}

  public async create({
    date_time_challenge,
    id_requester,
    players,
  }: ICreateChallengeDTO): Promise<Challenge> {
    const player_requester_already_exist = await this.playerModel.findById(
      id_requester,
    );

    if (!player_requester_already_exist) {
      throw new NotFoundException('Player request not found');
    }

    const players_already_exist = await this.playerModel
      .find()
      .where('_id')
      .in(players);

    if (players_already_exist.length != 2) {
      throw new NotFoundException('Player in game not found');
    }

    const check_player_request_in_players_game = players_already_exist.some(
      (player) => player._id.toString() === id_requester,
    );

    if (!check_player_request_in_players_game) {
      throw new BadRequestException('Player request not found in game players');
    }

    const category = await this.categoryModel
      .findOne()
      .where('players')
      .in([id_requester]);

    if (!category) {
      throw new BadRequestException('Player request not found in category');
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const id_category = category._id.toString();

    const challenge = await this.challengeModel.create({
      date_time_challenge,
      status: ChallengeStatus.PENDING,
      date_time_request: new Date(),
      date_time_response: null,
      id_requester,
      id_category,
      players,
    });

    return challenge;
  }
}
