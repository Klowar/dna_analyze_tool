import { handleOrfGeneration } from './generator';
import { handleOrfSearch } from "./scanner";


const handlers = {
    parseOrf: handleOrfSearch,
    generateOrf: handleOrfGeneration
}
const listeners = {

}

export { handlers, listeners };
