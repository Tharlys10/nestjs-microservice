import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { ICreatePlayerDTO } from './dtos/ICreatePlayerDTO';
import { IUpdatePlayerDTO } from './dtos/IUpdatePlayerDTO';
import { Player } from './models/player.model';
import { PlayersValidationParamsPagination } from '../../shared/pipes/playersValidationParamsPagination.pipe';
import { PlayersService } from './players.service';

@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Get('/')
  public async show(
    @Query('amount', PlayersValidationParamsPagination) amount: number,
    @Query('page', PlayersValidationParamsPagination) page: number,
  ): Promise<Player[]> {
    const players = await this.playersService.show(amount, page);

    return players;
  }

  @Get('/:id')
  public async index(@Param('id') id: string): Promise<Player> {
    const player = await this.playersService.index(id);

    return player;
  }

  @Get('/email/:email')
  public async indexByEmail(@Param('email') email: string): Promise<Player> {
    const player = await this.playersService.indexByEmail(email);

    return player;
  }

  @Post('/')
  @UsePipes(ValidationPipe)
  public async create(
    @Body() { name, email, phone_number }: ICreatePlayerDTO,
  ): Promise<Player> {
    const player_create = await this.playersService.create({
      name,
      email,
      phone_number,
    });

    return player_create;
  }

  @Put('/:id')
  @UsePipes(ValidationPipe)
  public async update(
    @Param('id') id: string,
    @Body() { name, email, phone_number }: IUpdatePlayerDTO,
  ): Promise<Player> {
    const player_update = await this.playersService.update(id, {
      name,
      email,
      phone_number,
    });

    return player_update;
  }

  @Delete('/:id')
  public async delete(@Param('id') id: string): Promise<void> {
    await this.playersService.delete(id);
  }
}
