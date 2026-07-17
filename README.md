# Pokedex

A command-line Pokedex built in TypeScript. Explore locations from the Pokémon world, encounter Pokémon, try to catch them, and inspect your collection — all from a REPL prompt powered by the [PokéAPI](https://pokeapi.co/).

```
Pokedex > map
canalave-city-area
eterna-city-area
pastoria-city-area
...
Pokedex > explore canalave-city-area
tentacool
tentacruel
staryu
...
Pokedex > catch tentacool
Throwing a Pokeball at tentacool...
tentacool was caught!
```

## Features

- **Paginated map browsing** — walk through location areas with `map` / `mapb`
- **Location exploration** — see which Pokémon appear in a given area
- **Catching** — throw a Pokéball; harder Pokémon (higher base experience) are tougher to catch
- **Inspection** — view height, weight, stats, and types for caught Pokémon
- **Personal Pokedex** — list everything you've caught this session
- **Response caching** — API results are cached in memory to keep the REPL snappy

## Requirements

- [Node.js](https://nodejs.org/) 22+ (see `.nvmrc`)

## Getting started

```bash
git clone <repo-url>
cd pokedex
npm install
```

### Run

```bash
npm run build
npm start
```

Or build and run in one step:

```bash
npm run dev
```

### Test

```bash
npm test
```

## Commands

| Command | Description |
| --- | --- |
| `help` | Show available commands |
| `map` | Show the next page of location areas |
| `mapb` | Show the previous page of location areas |
| `explore <location>` | List Pokémon found in a location area |
| `catch <pokemon>` | Attempt to catch a Pokémon |
| `inspect <pokemon>` | Show details for a Pokémon you've caught |
| `pokedex` | List all Pokémon in your Pokedex |
| `exit` | Quit the REPL |

## Example session

```text
Pokedex > help
Pokedex > map
Pokedex > explore pastoria-city-area
Pokedex > catch magikarp
Pokedex > inspect magikarp
Pokedex > pokedex
Pokedex > exit
```

## Project structure

```text
src/
  main.ts           # Entry point
  repl.ts           # REPL loop and input parsing
  state.ts          # Shared CLI state
  command*.ts       # Individual command handlers
  pokeapi.ts        # PokéAPI client
  pokecache.ts      # In-memory cache with TTL reaping
```

## License

ISC
