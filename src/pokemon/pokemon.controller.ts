import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { CreatePokemonDTO } from './dto/pokemonDTO';
import { Pokemon, PokemonPower, Power } from '@prisma/client';
import { PowerService } from '../power/power.service';

@Controller('pokemon')
export class PokemonController {
  constructor(
    private readonly pokemonService: PokemonService,
    private readonly powerService: PowerService,
  ) {}

  @Get()
  findAll(): Promise<Pokemon[]> {
    return this.pokemonService.findAllPokemons();
  }

  @Post()
  save(@Body() createPokemonDTO: CreatePokemonDTO) {
    return this.pokemonService.savePokemon(createPokemonDTO);
  }

  @Get('/:id')
  getById(@Param('id') id: string): Promise<Pokemon> {
    return this.pokemonService
      .findPokemonsById()
      .then((pokemons) => pokemons.find((pokemon) => pokemon.id === id));
  }

  @Get('/:id/powers')
  async getPowerAssociatedWithPokemonId(
    @Param('id') pokemonId: string,
  ): Promise<Power[]> {
    const pokemonPowers = await this.pokemonService.getAllPokemonPowers(
      pokemonId,
    );
    const allPowers = await this.powerService.getAllPowers();
    const cleanPowers = [];
    pokemonPowers.forEach((pokemonPower) => {
      allPowers.forEach((power) => {
        if (`${pokemonPower.powerId}` === `${power.id}`) {
          cleanPowers.push(power);
        }
      });
    });
    return cleanPowers;
  }
  @Delete('/:pokemonid/powers/:powerid')
  async getdeletePowerAssociatedWithPokemonId(@Param() params) {
    console.log(params);
    return await this.pokemonService.deleteAllPokemonPowers(
      params.pokemonid,
      params.powerid,
    );
  }
}
