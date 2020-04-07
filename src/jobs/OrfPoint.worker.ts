import { parentPort, workerData } from 'worker_threads';
import { generateRawOrfSeq, shakeOrfSeq } from '../handlers/orf_scanner/generator';
import { orfParser } from '../parser/orf_parser';
import { allRules } from '../rule/orf_rules';
import { CODDON_LENGTH } from './../constants/orf';

const minLen = 30 * CODDON_LENGTH;
const { orfLength, gcPercentage, times } = workerData;

let got = 0;
let orf = shakeOrfSeq(generateRawOrfSeq(orfLength, gcPercentage));

for (let i = 0; i < times; i++) {
    const potentialOrf = orfParser(orf);

    const orfs = potentialOrf.filter(
        _ => _
            && allRules(_)
            && _.length > minLen
    );
    if (orfs.length > 0)
        got++;
    orf = shakeOrfSeq(orf);
}

parentPort.postMessage({ foundAmount: got });
process.exit();