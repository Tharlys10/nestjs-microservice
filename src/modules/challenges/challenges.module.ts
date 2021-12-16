import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategorySchema } from '../categories/models/category.model';
import { PlayerSchema } from '../players/models/player.model';

import { ChallengesController } from './challenges.controller';

import { ChallengesService } from './challenges.service';
import { ChallengeSchema } from './models/challenge.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Challenge', schema: ChallengeSchema },
      { name: 'Player', schema: PlayerSchema },
      { name: 'Category', schema: CategorySchema },
    ]),
  ],
  controllers: [ChallengesController],
  providers: [ChallengesService],
})
export class ChallengesModule {}
