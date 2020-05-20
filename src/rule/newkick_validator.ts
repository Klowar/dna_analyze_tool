const ROOT_END = ";";
const NODE_START = "(";
const NODE_END = ")";
const NODE_SEPARATOR = ",";
// REGEXP
const LEAF_REG_ONLY_DIGIT = /^:\d+$/i;
const LEAF_REG_ONLY_NAME = /^[a-z]+$/i;
const LEAF_REG_NAME_AND_DIGIT = /^[a-z]+:\d+$/i;
const NODE_REG = /^\((.+)\)([a-z]+)?(:\d+)?$/i;


export const stickNodes = (arr: string[]): string[] => {
    const resArr: string[] = [];

    for (let i = 0, tempArray = [], amount = 0; i < arr.length; i++) {
        amount += arr[i].includes(NODE_START) ? 1 : 0;
        amount -= arr[i].includes(NODE_END) ? 1 : 0;
        tempArray.push(arr[i]);
        if (arr[i].includes(NODE_END) && amount === 0) {
            resArr.push(tempArray.join(NODE_SEPARATOR));
            tempArray = [];
        }
    }
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
    data = data.trim();

    if (!data.endsWith(ROOT_END)) {
        throw new Error("Main string do not contain end semicolon");
    }
    nodesRule(data.slice(0, -1));
}
