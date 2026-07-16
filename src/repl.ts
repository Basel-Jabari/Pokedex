import { createInterface } from "node:readline";
import { getCommands } from "./command.js";
import { CLICommand } from "./command.js";

export function cleanInput(input: string): string[] {
    let inputArray = input.split(" ");
    let toRemove: number[] = [];
    for (let i = 0; i < inputArray.length; ++i) {
        inputArray[i] = inputArray[i].toLowerCase().trim();
        if (inputArray[i] == "") {
            toRemove.push(i);
        }
    }

    let newArray: string[] = [];
    let curIndex: number = 0;
    for (let i = 0; i < inputArray.length; ++i) {
        if (toRemove[curIndex] == i) {
            curIndex++;
        } else {
            newArray.push(inputArray[i]);
        }
    }

    return newArray;
}

export function startREPL() {
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "Pokedex > ",
    });

    rl.prompt();
    rl.on("line", (line: string) => {
        const words = cleanInput(line);

        if (words.length == 0) {
            rl.prompt();
        } else {
            if (words[0] in getCommands()) {
                getCommands()[words[0]].callback({});
            } else {
                console.log("Unknown command");
            }
            
            rl.prompt();
        }
    });
}