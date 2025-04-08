import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { catchError, firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ChampionService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async getChampionList() {
    const uri = this.configService.get('CHAMPION_URI');
    try {
      const response = await firstValueFrom(this.httpService.get(uri));

      const datas = response.data.data;
      const objToArr = Object.values(datas);
      const championList = objToArr.map((item: any) => ({
        id: item.id,
        key: item.key,
        name: item.name,
        image: item.image,
        tags: item.tags,
      }));
      return championList;
    } catch (error) {
      console.log(error);
    }

    // const result = datas.json();
    return;
  }
}
