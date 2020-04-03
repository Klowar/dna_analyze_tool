import { allRules } from './../src/rule/orf_rules';
import { orfParser } from './../src/parser/orf_parser';

const orf = "TAACAAGATTATAGACGTGACGGTTTAAGAACCTTCGAATTCTAGATGGGTATGCTACTCCATCAATTACACTCGCGTGCAGATGAGTTGCTTAATCTCTAACGACGAAGTGGAATGACATCCTTGCTATCCTAGGTCTTTAGGTTTTCAACGTAATCACAGTATACATCGTCTAGTGAGAAAAGTCAATCACCTTGAGT";
const foundOrf1 = "atgggtatgctactccatcaattacactcgcgtgcagatgagttgcttaatctctaa".toUpperCase();
const foundOrf2 = "atgacatccttgctatcctag".toUpperCase();

test('Should find at least 2 orf', () => {
    const potentialOrf = orfParser(orf);
    const orfs = potentialOrf.filter(_ => _ && allRules(_));

    expect(orfs.length).toBeGreaterThanOrEqual(2);
    expect(orfs.includes(foundOrf1)).toBeTruthy();
    expect(orfs.includes(foundOrf2)).toBeTruthy();
});

