import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsDateString,
  IsNotEmpty,
} from 'class-validator';
import { Player } from 'src/modules/players/models/player.model';

class ICreateChallengeDTO {
  @IsNotEmpty()
  @IsDateString()
  @ApiProperty({ required: true })
  date_time_challenge: Date;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  id_requester: string;

  @IsArray()
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  @ApiProperty({ required: true })
  players: Player[];
}

export { ICreateChallengeDTO };
