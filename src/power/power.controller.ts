import { Controller, Get, Param } from '@nestjs/common';
import { PokemonPower, Power } from '@prisma/client';
import { PowerService } from './power.service';

@Controller('power')
export class PowerController {
  constructor(private readonly powerService: PowerService) {}

  @Get()
  findAllPowers() {
    return this.powerService.getAllPowers();
  }
}
