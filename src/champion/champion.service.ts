import { PrismaService } from './../prisma/prisma.service';
import { HttpService } from '@nestjs/axios';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { ChampionTypes } from './types/champion.type';

@Injectable()
export class ChampionService implements OnModuleInit {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
  ) {}

  async onModuleInit() {
    await this.fetchApiChampionsData();
  }

  async getChampionList() {
    try {
      const championList = await this.prisma.champion.findMany();
      if (!championList) {
        throw new Error('챔피언 데이터가 없습니다');
      }
      return championList;
    } catch (error) {
      console.log('error: ', error);
    }
  }

  async fetchApiChampionsData() {
    const uri = this.configService.get('BASE_CHAMPION_URI');
    const version = this.configService.get('RIOT_VERSION');

    try {
      const response = await firstValueFrom(
        this.httpService.get(`${uri}/${version}/data/ko_KR/champion.json`),
      );

      if (!response) {
        throw new Error('챔피언 데이터가 없습니다');
      }

      const datas = response.data.data;
      const objToArr = Object.values(datas);
      const championList = objToArr.map((item: ChampionTypes) => ({
        champion_id: item.id,
        key: item.key,
        version: item.version,
        name: item.name,
        splash_image: `${uri}/${version}/img/champion/${item.image.full}`,
        icon_image: `${uri}/img/champion/splash/${item.id}_0.jpg`,
        tags: item.tags,
      }));

      await this.prisma.champion.createMany({
        data: championList,
        skipDuplicates: true,
      });

      return championList;
    } catch (error) {
      console.log(error);
    }
  }
}
