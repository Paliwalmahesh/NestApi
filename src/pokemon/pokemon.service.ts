import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePokemonDTO } from './dto/pokemonDTO';
import { Pokemon } from '@prisma/client';

@Injectable()
export class PokemonService {
  constructor(private readonly prismaService: PrismaService) {}

  findAllPokemons(): Promise<Pokemon[]> {
    return this.prismaService.pokemon.findMany();
  }

  savePokemon(createPokemonDTO: CreatePokemonDTO) {
    const { name, imageUrl, power } = createPokemonDTO;
    return this.prismaService.pokemon.create({
      data: {
        name,
        imageUrl,
        pokemonPower: {
          createMany: {
            data: power.map((powerId) => {
              return { powerId };
            }),
          },
        },
      },
    });
  }

  findPokemonsById(): Promise<Pokemon[]> {
    return this.prismaService.pokemon.findMany();
  }

  getAllPokemonPowers(pokemonId: string) {
    return this.prismaService.pokemonPower.findMany();
  }
}
