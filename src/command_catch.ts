import { State } from "./state.js";

export async function commandCatch(state: State, ...args: string[]): Promise<void> {
    console.log(`Throwing a Pokeball at ${args[0]}...`);

    const pokemon = await state.PokeAPI.fetchPokemon(args[0]);
    const catchProbability = Math.max(0.01, 1 - pokemon.base_experience / 500.0);
    if (Math.random() < catchProbability) {
        console.log(`${args[0]} was caught!`);
        state.PokeAPI.user_pokedex.pokemons[pokemon.name] = pokemon;
    } else {
        console.log(`${args[0]} escaped!`);
    }
}