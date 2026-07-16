import { State } from "./state.js";

export async function commandMapB(state: State): Promise<void> {
    if (state.prevLocationsURL == "") {
        console.log("you're on the first page");
        return;
    }

    const locations = await state.PokeAPI.fetchLocations(state.prevLocationsURL);
    state.nextLocationsURL = locations.next ?? "";
    state.prevLocationsURL = locations.prev ?? "";

    for (const location of locations.names) {
        console.log(location);
    }
}