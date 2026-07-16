import { State } from "./state.js";
import { PokeAPI } from "./pokeapi.js";

export async function commandMap(state: State): Promise<void> {
    const locations = await state.PokeAPI.fetchLocations(state.nextLocationsURL);
    state.nextLocationsURL = locations.next;
    state.prevLocationsURL = locations.prev;

    for (const location of locations.names) {
        console.log(location);
    }
}