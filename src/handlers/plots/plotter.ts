import childProcess from 'child_process';
import path from 'path';
import { HandlerType } from '../types';


export const handleOrfGcPlot: HandlerType<number[]> = (): Promise<number[]> => {
    return new Promise((res, rej) => {
        childProcess.fork(
            path.join(__dirname, './childprocess.js'),
        )
            .on('message', (data: number[]) => {
                console.log(data);
                res(data);
            })
            .on('error', rej)

    })
}