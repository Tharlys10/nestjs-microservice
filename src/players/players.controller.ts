import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { ICreatePlayerDTO } from './dtos/ICreatePlayerDTO';
import { IUpdatePlayerDTO } from './dtos/IUpdatePlayerDTO';
import { Player } from './models/player.model';
import { PlayersService } from './players.service';

@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Get('/')
  public async show(): Promise<Player[]> {
    const players = await this.playersService.show();

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
  public async create(@Body() player: ICreatePlayerDTO): Promise<Player> {
    const player_create = await this.playersService.create(player);

    return player_create;
  }

  @Put('/:id')
  public async update(
    @Param('id') id: string,
    @Body() player: Omit<IUpdatePlayerDTO, 'id'>,
  ): Promise<Player> {
    const player_payload: IUpdatePlayerDTO = {
      id,
      ...player,
    };

    const player_update = await this.playersService.update(player_payload);

    return player_update;
  }

  @Delete('/:id')
  public async delete(@Param('id') id: string): Promise<void> {
    await this.playersService.delete(id);
  }
}
