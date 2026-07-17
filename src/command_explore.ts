import { State } from "./state.js";

export async function commandExplore(state: State, ...args: string[]): Promise<void> {
    const location = await state.PokeAPI.fetchLocation(args[0]);
    for (const pokemon_name of location.pokemon_names) {
        console.log(pokemon_name);
    }
}