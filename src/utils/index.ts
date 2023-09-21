export function range(start: number, end: number, step = 1){
    const arr = [];
    for (let i = start; i <= end; i += step) {
        arr.push(i);
    }
    return arr;
}

export const compareArrays = (a:Array<any>, b:Array<any>) =>
    a.length === b.length &&
    a.every((element, index) => element === b[index]);
