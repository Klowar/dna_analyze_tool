import { newkickValidator } from '../../rule/newkick_validator';
import { HandlerType } from './../types';

export const handleNewkickCheck: HandlerType<string[]> = (event, ...args): Promise<string[]> => {
    const [newkick] = args;
    return new Promise(res => {
        try {
            newkickValidator(newkick);
            res(["All ok!"]);
        } catch (_e) {
            const e = _e as Error;
            res([e.message]);
        }
    });
}