import { Body, Controller, Get, Post } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { CreatePokemonDTO } from './dto/pokemonDTO';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Get()
  findAll(): any {
    return this.pokemonService.findAllPokemons();
  }

  @Post()
  save(@Body() createPokemonDTO: CreatePokemonDTO) {
    return this.pokemonService.savePokemon(createPokemonDTO);
  }
}
