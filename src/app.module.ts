import { Module } from '@nestjs/common';
import { ChampionModule } from './champion/champion.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ChampionModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
  ],
})
export class AppModule {}
