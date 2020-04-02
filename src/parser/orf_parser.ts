import { START_CODDON, STOP_CODDON_DNA1, STOP_CODDON_DNA2, STOP_CODDON_DNA3, STOP_CODDON_RNA1, STOP_CODDON_RNA2, STOP_CODDON_RNA3 } from './../constants/orf';

export const orfParser = (str: string): string[] => {

    const regs = [
        new RegExp(`${START_CODDON}.+${STOP_CODDON_DNA1}`, "g"),
        new RegExp(`${START_CODDON}.+${STOP_CODDON_DNA2}`, "g"),
        new RegExp(`${START_CODDON}.+${STOP_CODDON_DNA3}`, "g"),
        new RegExp(`${START_CODDON}.+${STOP_CODDON_RNA1}`, "g"),
        new RegExp(`${START_CODDON}.+${STOP_CODDON_RNA2}`, "g"),
        new RegExp(`${START_CODDON}.+${STOP_CODDON_RNA3}`, "g"),
    ];

    const orfs: string[][] = [];

    for (const reg of regs) {
        orfs.push(
            str.match(reg)
        )
    }
    return orfs.flat(Infinity);
}
