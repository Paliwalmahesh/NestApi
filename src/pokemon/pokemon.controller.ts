import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { CreatePokemonDTO } from './dto/pokemonDTO';
import { Pokemon, PokemonPower, Power } from '@prisma/client';
import { PowerService } from 'src/power/power.service';

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
  ): Promise<PokemonPower[]> {
    const power = await this.pokemonService.getAllPokemonPowers(pokemonId);
    return power.filter((power) => power.pokemonId === pokemonId);
  }

  @Get('/:id/clean-powers')
  async getCleanPowerAssociatedWithPokemonId(
    @Param('id') pokemonId: string,
  ): Promise<Power[]> {
    const pokemonPowers = await this.pokemonService.getAllPokemonPowers(
      pokemonId,
    );

    const associatedPowers = pokemonPowers.filter(
      (power) => power.pokemonId === pokemonId,
    );

    const allPowers = await this.powerService.getAllPowers();
    const cleanPowers = [];
    associatedPowers.forEach((pokemonPower) => {
      allPowers.forEach((power) => {
        if (`${pokemonPower.powerId}` === `${power.id}`) {
          cleanPowers.push(power);
        }
      });
    });
    return cleanPowers;
  }

  @Get('/:id/clean-optimized-powers')
  async getCleanOptimizedCleanPowers(@Param('id') pokemonId: string) {}
}
