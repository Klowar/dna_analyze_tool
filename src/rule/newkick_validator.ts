const ROOT_END = ";";
const NODE_START = "(";
const NODE_END = ")";
const NODE_SEPARATOR = ",";
const LEAF_SEPARATOR = ":";
// REGEXP
const LEAF_REG_ONLY_DIGIT = /^:\d+(\.\d+)?$/i;
const LEAF_REG_ONLY_NAME = /^[a-z]+\d*$/i;
const LEAF_REG_NAME_AND_DIGIT = /^[a-z]+\d*:\d+(\.\d+)?$/i;
const NODE_REG = /^\(?(.+)\)([a-z]+\d*)?(:\d+(\.\d+)?)?$/i;
const AMOUNT_START = /\(/g;
const AMOUNT_END = /\)/g;

const layers: string[] = [];

export const stickNodes = (arr: string[]): string[] => {
    const resArr: string[] = [];
    let amount = 0;
    for (let i = 0, tempArray = []; i < arr.length; i++) {
        const start = arr[i].match(AMOUNT_START);
        const end = arr[i].match(AMOUNT_END);
        amount += start === null ? 0 : start.length;
        amount -= end === null ? 0 : end.length;
        tempArray.push(arr[i]);
        if (arr[i].includes(NODE_END) && amount === 0) {
            resArr.push(tempArray.join(NODE_SEPARATOR));
            tempArray = [];
        }
        if (amount < 0) throw new Error(`${tempArray.join(NODE_SEPARATOR)} braces not valid!`)
    }
    if (amount !== 0) throw new Error(`${arr.join(NODE_SEPARATOR)} braces not valid!`)
    return resArr;
};

export const leafRule = (leaf: string): void => {
    leaf = leaf.trim();
    if (leaf.length === 0) return;

    const matchName = leaf.match(LEAF_REG_ONLY_NAME);
    const matchDigit = leaf.match(LEAF_REG_ONLY_DIGIT);
    const matchNameDigit = leaf.match(LEAF_REG_NAME_AND_DIGIT);

    if (matchName === null && matchDigit === null && matchNameDigit === null)
        throw new Error(`${leaf} leaf wrong`);

    const [name] = leaf.split(LEAF_SEPARATOR);
    if (name) {
        if (layers.includes(name))
            throw new Error(`Duplicate name ${name}`);
        layers.push(name);
    }
}

export const handleNodeParse = (node: string): [string[], string[]] => {

    const arr: string[] = node.split(NODE_SEPARATOR);
    const leafs = arr.filter(_ => (!_.includes(NODE_START)) && !_.includes(NODE_END));
    const nodes = stickNodes(
        arr.filter(_ => (_.includes(NODE_START)) || _.includes(NODE_END))
    );

    return [leafs, nodes];
}

export const nodesRule = (node: string): void => {
    node = node.trim();
    const matched = node.match(NODE_REG);

    if (matched === null)
        throw new Error(`${node} branch wrong`);

    const [leafs, nodes] = handleNodeParse(matched[1]);
    leafs.forEach(_ => leafRule(_));
    nodes.forEach(_ => nodesRule(_));
}


/**  VALIDATOR ENTRY FUNCTION */

export const newkickValidator = (data: string): void => {
    layers.length = 0;
    data = data.trim();

    if (!data.endsWith(ROOT_END)) {
        throw new Error("Main string do not contain end semicolon");
    }
    nodesRule(data.slice(0, -1));
}
