import { Module } from '@nestjs/common';
import { ChampionController } from './champion.controller';
import { ChampionService } from './champion.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
      responseType: 'json', // 👈 이거 추가
    }),
    ConfigModule,
  ],
  controllers: [ChampionController],
  providers: [ChampionService],
})
export class ChampionModule {}
