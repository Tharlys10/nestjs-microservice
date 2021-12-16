import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PlayersValidationParamsPagination } from 'src/shared/pipes/playersValidationParamsPagination.pipe';
import { ChallengesService } from './challenges.service';
import { ICreateChallengeDTO } from './dtos/ICreateChallengeDTO';
import { Challenge } from './models/challenge.model';

@Controller('challenges')
export class ChallengesController {
  constructor(private readonly challengeService: ChallengesService) {}

  @Get('/')
  public async show(
    @Query('amount', PlayersValidationParamsPagination) amount: number,
    @Query('page', PlayersValidationParamsPagination) page: number,
  ): Promise<Challenge[]> {
    const challenges = await this.challengeService.show(amount, page);

    return challenges;
  }

  @Get('/request/:id')
  public async indexByRequest(@Param() id: string): Promise<Challenge[]> {
    const challenges = await this.challengeService.indexByRequest(id);

    return challenges;
  }

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
