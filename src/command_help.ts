import { CLICommand } from "./command.js";

export function commandHelp(commands: Record<string, CLICommand>): void {
    console.log(`Welcome to the Pokedex!
Usage:

help: Displays a help message
exit: Exit the Pokedex`);
}
