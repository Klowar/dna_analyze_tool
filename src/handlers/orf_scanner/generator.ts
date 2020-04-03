import { HandlerType } from './../types';

const gc = "GC";
const at = "AT";

const calculateLength = (percent: number, length: number): number => {
    const temp = percent * length;
    const side = temp % 2;
    return Math.round(temp / 2 + side);
}

const shake = (str: string): string => {

    const arr = [...str];

    for (let i = 0; i < str.length; i++) {
        const index = Math.round(Math.random() * str.length);
        const index2 = Math.round(Math.random() * str.length);
        const temp = arr[index];
        arr[index] = arr[index2];
        arr[index2] = temp;
    }

    return arr.join('');
}

export const handleOrfGeneration: HandlerType<string> = (event, ...args): Promise<string> => {
    return new Promise((res) => {
        const length = Number(args[0]);
        const gcPercentage = Number(args[1]);
        const gcLen = calculateLength(gcPercentage / 100, length);
        const atLen = calculateLength(1 - gcPercentage / 100, length);
        const orf = `${gc.repeat(gcLen)}${at.repeat(atLen)}`;
        res(shake(orf));
    })
}
