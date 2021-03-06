import { Worker } from 'worker_threads';
import path from 'path';

const AMOUNT_RUNS = 10000;
const ORF_RUN_LENGTH = 1000;

const result = new Array<number>(81);
let amount = 0;

(async function (): Promise<void> {
    for (let gc = 20, i = 0; gc <= 100; gc++, i++) {
        await new Promise(res => {
            new Worker(
                path.join(__dirname, '../../jobs/OrfPoint.worker.js'),
                {
                    workerData: {
                        orfLength: ORF_RUN_LENGTH,
                        gcPercentage: gc,
                        times: AMOUNT_RUNS
                    }
                }
            )
                .on('message', (data: { foundAmount: number }) => result[i] = data.foundAmount)
                .on('exit', () => { res(amount++); process.send("progress"); })
                .on('error', console.log)
                .on('online', () => console.log(`Worker with gc ${gc} started`));
        });
    }
})().then(() => {
    process.send(result);
});
