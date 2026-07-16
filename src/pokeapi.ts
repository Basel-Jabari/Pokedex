export class PokeAPI {
    private static readonly baseURL = "https://pokeapi.co/api/v2";

    constructor() { }

    async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
        let fullURL = pageURL ? pageURL : `${PokeAPI.baseURL}/location-area`;

        const response = await fetch(fullURL);
        const data = await response.json();

        let locations: ShallowLocations = { names: [], next: data.next, prev: data.previous };
        for (const location of data.results) {
            locations.names.push(location.name);
        }

        return locations;
    }

    async fetchLocation(locationName: string): Promise<Location> {
        const fullURL = `${PokeAPI.baseURL}/location-area/${locationName}`;
        const response = await fetch(fullURL);
        const data = await response.json();
        return { name: data.name };
    }
}

export type ShallowLocations = {
    names: Location[];
    next: string;
    prev: string;
};

export type Location = {
    name: string;
};