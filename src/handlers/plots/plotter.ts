import childProcess from 'child_process';
import path from 'path';
import { HandlerType } from '../types';


export const handleOrfGcPlot: HandlerType<number[]> = (event): Promise<number[]> => {
    return new Promise((res, rej) => {
        childProcess.fork(
            path.join(__dirname, './childprocess.js'),
        )
            .on('message', (data: number[] | string) => {
                if (Array.isArray(data)) {
                    console.log(data);
                    res(data);
                } else {
                    event.sender.send("progress");
                }
            })
            .on('error', rej)

    })
}