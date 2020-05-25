import { CODDON_LENGTH } from './../../constants/orf';
import { orfParser } from './../../parser/orf_parser_2';
import { allRules } from './../../rule/orf_rules';
import { HandlerType } from './../types';

const dynamicLengRule = (orf: string, length: number): boolean => {
    return orf.length >= length;
}

const pairedTag = (s: string): string => {
    switch (s) {
        case "A":
            return "T";
        case "C":
            return "G";
        case "T":
            return "A";
        case "G":
            return "C";
    }
}

const reverse = (str: string): string => {
    const arr = [...str];
    const revArr = arr.reverse();

    return revArr.map(_ => pairedTag(_)).join("");
}

export const handleOrfSearch: HandlerType<[string[], string[]]> = (event, ...args): Promise<[string[], string[]]> => {
    return new Promise((res) => {
        const potentialOrf = orfParser(args[0]);

        const orfs = potentialOrf.filter(
            _ => _
                && allRules(_)
                && dynamicLengRule(_, args[1] || CODDON_LENGTH)
        );
        const reverePotentialOrf = orfParser(reverse(args[0]));
        const revOrf = reverePotentialOrf.filter(
            _ => _
                && allRules(_)
                && dynamicLengRule(_, args[1] || CODDON_LENGTH)
        );

        res([orfs, revOrf]);
    })
}