import { START_CODDON_DNA, STOP_CODDON_DNA1, STOP_CODDON_DNA2, STOP_CODDON_DNA3 } from './../constants/orf';


const findSmallest = (str: string, prefix = START_CODDON_DNA): string[] => {
    const arr: string[] = [];

    const codons = str.match(/.{1,3}/g);
    codons.forEach((elem, index) => {
        if (elem === prefix && index !== 0) {
            arr.push(
                codons.slice(index).join('')
            )
        }
    })
    return arr;
}

const findSmallestForArray = (arr: RegExpMatchArray | string[]): string[] => {
    const result: string[][] = [arr];

    for (const str of arr) {
        if (str === null) continue;
        result.push(findSmallest(str));
    }
    return result.flat(1);
}

export const orfParser = (str: string): string[] => {

    const regs = [
        new RegExp(`${START_CODDON_DNA}(\\w{3})+?${STOP_CODDON_DNA1}`, "ig"),
        new RegExp(`${START_CODDON_DNA}(\\w{3})+?${STOP_CODDON_DNA2}`, "ig"),
        new RegExp(`${START_CODDON_DNA}(\\w{3})+?${STOP_CODDON_DNA3}`, "ig"),
    ];

    const orfs: string[][] = [];
    for (const reg of regs) {
        const matches = str.matchAll(reg);
        for (const temp of matches) {
            orfs.push(
                findSmallestForArray(temp)
            );
        }
    }

    return orfs.flat(Infinity);
}
