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
  date_time_challenge: Date;

  @IsNotEmpty()
  id_requester: string;

  @IsArray()
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  players: Player[];
}

export { ICreateChallengeDTO };
