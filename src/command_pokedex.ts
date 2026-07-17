import { State } from "./state.js";

export async function commandPokedex(state: State): Promise<void> {
    console.log(`Your Pokedex:`);
    for (const [pokemonName, pokemon] of Object.entries(state.PokeAPI.user_pokedex.pokemons)) {
        console.log(`\t- ${pokemonName}`);
    }
}