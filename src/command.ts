import { commandExit } from "./command_exit.js"
import { commandHelp } from "./command_help.js"
import { commandMap } from "./command_map.js";
import { commandMapB } from "./command_mapb.js";
import { commandExplore } from "./command_explore.js";
import { commandCatch } from "./command_catch.js";
import { commandInspect } from "./command_inspect.js";
import { commandPokedex } from "./command_pokedex.js";
import { CLICommand } from "./state.js";

export function getCommands(): Record<string, CLICommand> {
    return {
        exit: {
            name: "exit",
            description: "Exit the Pokedex",
            callback: commandExit,
        },
        help: {
            name: "help",
            description: "Displays a help message",
            callback: commandHelp,
        },
        map: {
            name: "map",
            description: "Displays a map of the locations",
            callback: commandMap,
        },
        mapb: {
            name: "mapb",
            description: "Displays the previous page of the map",
            callback: commandMapB,
        },
        explore: {
            name: "explore",
            description: "Explores the given location",
            callback: commandExplore,
        },
        catch: {
            name: "catch",
            description: "Throws a Pokeball at the given pokemon",
            callback: commandCatch,
        },
        inspect: {
            name: "inspect",
            description: "Inspects the given pokemon (if you have caught it)",
            callback: commandInspect,
        },
        pokedex: {
            name: "pokedex",
            description: "Displays your Pokedex",
            callback: commandPokedex,
        }
    };
}