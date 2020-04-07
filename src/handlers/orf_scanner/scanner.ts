import { CODDON_LENGTH } from './../../constants/orf';
import { orfParser } from './../../parser/orf_parser';
import { allRules } from './../../rule/orf_rules';
import { HandlerType } from './../types';

const dynamicLengRule = (orf: string, length: number): boolean => {
    return orf.length >= length;
}

export const handleOrfSearch: HandlerType<string[]> = (event, ...args): Promise<string[]> => {
    return new Promise((res) => {
        const potentialOrf = orfParser(args[0]);

        const orfs = potentialOrf.filter(
            _ => _
                && allRules(_)
                && dynamicLengRule(_, args[1] || CODDON_LENGTH)
        );

        res(orfs);
    })
}