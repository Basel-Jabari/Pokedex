import { Cache } from "./pokecache.js";

export class PokeAPI {
    private static readonly baseURL = "https://pokeapi.co/api/v2";
    user_pokedex: Pokedex = { pokemons: {} };
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
        const cached = this.#cache.get<Location>(fullURL);
        if (cached != undefined) {
            return cached;
        }

        const response = await fetch(fullURL);
        const data = await response.json();

        const location: Location = { pokemon_names: [] };
        for (const encounter of data.pokemon_encounters) {
            location.pokemon_names.push(encounter.pokemon.name);
        }

        this.#cache.add<Location>(fullURL, location);
        return location;
    }

    async fetchPokemon(pokemonName: string): Promise<Pokemon> {
        const fullURL = `${PokeAPI.baseURL}/pokemon/${pokemonName}`;
        const cached = this.#cache.get<Pokemon>(fullURL);
        if (cached != undefined) {
            return cached;
        }

        const response = await fetch(fullURL);
        const data = await response.json();

        let pokemon: Pokemon = {
            name: pokemonName,
            height: data.height,
            weight: data.weight,
            stats: {},
            types: [],
            base_experience: data.base_experience
        };

        for (const stat of data.stats) {
            pokemon.stats[stat.stat.name] = stat.base_stat;
        }

        for (const type of data.types) {
            pokemon.types.push(type.type.name);
        }
        
        this.#cache.add<Pokemon>(fullURL, pokemon);
        return pokemon;
    }
}

export type ShallowLocations = {
    names: string[];
    next: string;
    prev: string;
};

export type Location = {
    pokemon_names: string[];
};

export type Pokemon = {
    name: string;
    height: number;
    weight: number;
    stats: Record<string, number>;
    types: string[];
    base_experience: number;
};

export type Pokedex = {
    pokemons: Record<string, Pokemon>;
};