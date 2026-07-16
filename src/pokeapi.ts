import { Cache } from "./pokecache.js";

export class PokeAPI {
    private static readonly baseURL = "https://pokeapi.co/api/v2";
    #cache = new Cache(1000 * 60 * 5);

    constructor(interval?: number) {
        if (interval != undefined) {
            this.#cache = new Cache(interval);
        }
    }

    async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
        let fullURL = pageURL ? pageURL : `${PokeAPI.baseURL}/location-area`;

        const cached = this.#cache.get<ShallowLocations>(fullURL);
        if (cached != undefined) {
            return cached;
        }

        const response = await fetch(fullURL);
        const data = await response.json();

        let locations: ShallowLocations = { names: [], next: data.next, prev: data.previous };
        for (const location of data.results) {
            locations.names.push(location.name);
        }

        this.#cache.add<ShallowLocations>(fullURL, locations);
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
    names: string[];
    next: string;
    prev: string;
};

export type Location = {
    name: string;
};