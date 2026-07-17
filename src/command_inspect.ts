import { State } from "./state.js";

export async function commandInspect(state: State, ...args: string[]): Promise<void> {
    const pokemon = state.PokeAPI.user_pokedex.pokemons[args[0]];

    if (pokemon == undefined) {
        console.log(`you have not caught that pokemon`);
        return;
    }

    console.log(`Name: ${pokemon.name}
Height: ${pokemon.height}
Weight: ${pokemon.weight}
`);

    console.log(`Stats:`);
    for (const [statName, statVal] of Object.entries(pokemon.stats)) {
        console.log(`\t-${statName}: ${statVal}`);
    }

    console.log(`Types:`);
    for (const type of pokemon.types) {
        console.log(`\t- ${type}`);
    }
}