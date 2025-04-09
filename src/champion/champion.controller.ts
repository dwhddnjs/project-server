import { ChampionService } from './champion.service';
import { Controller, Get } from '@nestjs/common';

@Controller('champion')
export class ChampionController {
  constructor(private readonly championService: ChampionService) {}

  @Get()
  getChampionList() {
    return this.championService.getChampionList();
  }
}
