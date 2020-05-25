import { START_CODDON_DNA, STOP_CODDON_DNA1, STOP_CODDON_DNA2, STOP_CODDON_DNA3 } from './../constants/orf';

function findCoddons(arr: string[]): number[][] {
    const pairs: number[][] = [];
    let start = 0, end = 0, updated = false;
    arr.forEach((_, i) => {
        if (_ === START_CODDON_DNA && !updated) { start = i; updated = true }
        if (
            (
                _ === STOP_CODDON_DNA1
                || _ === STOP_CODDON_DNA2
                || _ === STOP_CODDON_DNA3
            ) && updated) {
            end = i;
            updated = false;
        }
        if (start < end) {
            pairs.push([start, end]);
            start = end;
        }
    });
    return pairs;
}

export const orfParser = (str: string): string[] => {
    // RAW data
    const coddonsF = str.match(/.{1,3}/g);
    const coddonsS = str.slice(1).match(/.{1,3}/g);
    const coddonsT = str.slice(2).match(/.{1,3}/g);
    // ORF
    const pairF = findCoddons(coddonsF);
    const pairS = findCoddons(coddonsS);
    const pairT = findCoddons(coddonsT);
    // Mapped ORF
    const mappedF = pairF.map(_ => coddonsF.slice(_[0], _[1] + 1).join(""));
    const mappedS = pairS.map(_ => coddonsS.slice(_[0], _[1] + 1).join(""));
    const mappedT = pairT.map(_ => coddonsT.slice(_[0], _[1] + 1).join(""));

    return [...mappedF, ...mappedS, ...mappedT];
}
