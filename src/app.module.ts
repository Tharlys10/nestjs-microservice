import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PlayersModule } from './players/players.module';

@Module({
  imports: [ConfigModule.forRoot(), PlayersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
