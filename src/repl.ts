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