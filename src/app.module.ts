import { Module } from '@nestjs/common';
import { ChampionModule } from './champion/champion.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    ChampionModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    PrismaModule,
  ],
})
export class AppModule {}
