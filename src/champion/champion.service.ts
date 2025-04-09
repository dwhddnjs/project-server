import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { ChampionTypes } from './types/champion.type';

@Injectable()
export class ChampionService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async getChampionList() {
    const uri = this.configService.get('BASE_CHAMPION_URI');
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${uri}/data/ko_KR/champion.json`),
      );
      const datas = response.data.data;
      const objToArr = Object.values(datas);

      const championList = objToArr.map((item: ChampionTypes) => ({
        id: item.id,
        key: item.key,
        verion: item.version,
        name: item.name,
        image: `${uri}/img/champion/${item.image.full}`,
        tags: item.tags,
      }));

      return championList;
    } catch (error) {
      console.log(error);
    }
  }
}
