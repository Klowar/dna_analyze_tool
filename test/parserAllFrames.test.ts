import { allRules } from '../src/rule/orf_rules';
import { orfParser } from '../src/parser/orf_parser';

// Input string
const orf = "GCGCAAACGCTCGTTTGAGCGTACGCGGTATCCGGGAAATTTTCCATTGCTTATTCACGTTGATATCACTAGTTAAATATATATAATAAACTCAATGAATCCTTTTACATGTTTGACAAATAATGTATTATACTAAGAATCAATACAAATTATAAACTTATAATTTTATATGTGTAATTGAGGTGAATGACTCCTATAGA";
//  existing orfs
const found4 = "atgtgtaattga".toUpperCase();
const found1 = "atgtttgacaaataa".toUpperCase();
const found5 = "atgtattatactaagaatcaatacaaattataa".toUpperCase();
const found3 = "atgaatccttttacatgtttgacaaataatgtattatactaa".toUpperCase();

test('Should find orf with all reading frame', () => {
    const potentialOrf = orfParser(orf);
    const orfs = potentialOrf.filter(_ => _ && allRules(_));
    const allFrameOrfs = [found1, found3, found4, found5];


    expect(orfs.length).toBeGreaterThanOrEqual(1);
    for (const check of orfs) {
        expect(allFrameOrfs.includes(check)).toBeTruthy();
    }
});

