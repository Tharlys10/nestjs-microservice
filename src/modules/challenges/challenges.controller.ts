import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ChallengesService } from './challenges.service';
import { ICreateChallengeDTO } from './dtos/ICreateChallengeDTO';
import { Challenge } from './models/challenge.model';

@Controller('challenges')
export class ChallengesController {
  constructor(private readonly challengeService: ChallengesService) {}

  @Post('/')
  @UsePipes(ValidationPipe)
  public async create(
    @Body() { date_time_challenge, id_requester, players }: ICreateChallengeDTO,
  ): Promise<Challenge> {
    const challenge = await this.challengeService.create({
      date_time_challenge,
      id_requester,
      players,
    });

    return challenge;
  }
}
