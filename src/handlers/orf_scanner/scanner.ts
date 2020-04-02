import { orfParser } from './../../parser/orf_parser';
import { allRules } from './../../rule/orf_rules';
import { HandlerType } from './../types';


export const handleOrfSearch: HandlerType<string[]> = (event, ...args): Promise<string[]> => {
    return new Promise((res) => {
        const potentialOrf = orfParser(args[0]);
        const orfs = potentialOrf.filter(_ => _ && allRules(_));
        console.log(orfs);

        res(orfs);
    })
}