import { State } from "./state.js";

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

export async function startREPL(state: State) {
    state.readline.prompt();
    state.readline.on("line", async (line: string) => {
        const words = cleanInput(line);

        if (words.length == 0) {
            state.readline.prompt();
            return;
        }

        const command = state.commands[words[0]];
        if (command == undefined) {
            console.log("Unknown command");
            state.readline.prompt();
            return;
        }

        try {
            await command.callback(state);
        } catch (err) {
            console.log(err);
        }

        state.readline.prompt();
    });
}