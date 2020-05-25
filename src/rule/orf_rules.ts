import { START_CODDON_DNA, STOP_CODDON_DNA1, STOP_CODDON_DNA2, STOP_CODDON_DNA3, STOP_CODDON_RNA1, STOP_CODDON_RNA2, STOP_CODDON_RNA3 } from './../constants/orf';

export const lengthRule = (orf: string): boolean => {
    return orf.length % 3 === 0;
}

export const startCoddonRule = (orf: string): boolean => {
    return orf.startsWith(START_CODDON_DNA, 0);
}

export const stopCoddonEndRule = (orf: string): boolean => {

    return orf.endsWith(STOP_CODDON_DNA1)
        || orf.endsWith(STOP_CODDON_DNA2)
        || orf.endsWith(STOP_CODDON_DNA3)
        || orf.endsWith(STOP_CODDON_RNA1)
        || orf.endsWith(STOP_CODDON_RNA2)
        || orf.endsWith(STOP_CODDON_RNA3);
}

export const stopCodonOnlyEndRule = (orf: string): boolean => {
    const stopCoddons = [
        STOP_CODDON_DNA1,
        STOP_CODDON_DNA2,
        STOP_CODDON_DNA3
    ];
    const codons = orf.match(/.{1,3}/g);
    codons.pop();

    return codons.every(
        (_) => !stopCoddons.includes(_)
    );
}

export const allRules = (orf: string): boolean => {
    console.group(orf);
    console.log("leng", lengthRule(orf));
    console.log("start", startCoddonRule(orf));
    console.log("stop", stopCoddonEndRule(orf));
    console.log("only", stopCodonOnlyEndRule(orf));
    console.groupEnd();
    return lengthRule(orf)
        && startCoddonRule(orf)
        && stopCoddonEndRule(orf)
        && stopCodonOnlyEndRule(orf);
}