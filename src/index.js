const mainRegex = /([(]?[0-9+*a-z]+[)]?)/gm;
const regexMultiplay = /(?<operandOne>[a-z0-9]+)(?<operation>[*]{1})(?<operandTwo>[a-z0-9]+)/i;
const regexPlus = /[a-z0-9]+/gm;

const simpleOperations = (expression = '') => {
    let input = new String(expression);

    const foundMultiply = input.match(regexMultiplay);

    if (foundMultiply) {
        const result = multiply(foundMultiply.groups.operandOne, foundMultiply.groups.operandTwo);
        input = input.replace(foundMultiply[0], result)
        if (input.match(regexMultiplay)) { input = simpleOperations(input) }
    }

    const foundPlus = input.match(regexPlus);

    if (regexPlus) {
        input = foundPlus.reduce((acc, curr) => {
            return acc + curr;
        }, '')
    }

    return input;
}

const multiply = (first = 0, second = 0) => {
    try {
        if (isNaN(first) && isNaN(second)) {
            throw new Error("One of operand has to be the NUMBER");
        }
        const times = !isNaN(first) ? first : second;
        let value = isNaN(first) ? first : second;
        let result = '';
        for (let index = 0; index < times; index++) {
            result += value;
        }
        return result;
    } catch (e) {
        console.error(e);
    }
}

const checkForScopes = (arrayOfExpression) => {
    try {
        const arr = arrayOfExpression.map(item => {
            if (item.includes('(') && item.includes(')')) {
                item = simpleOperations(item);
            }
            return item;
        })

        let input = arr.join('');

        if (input.includes('(') && !input.includes(')')) {
            throw new Error('No close )')
        }

        if (!input.includes('(') && input.includes(')')) {
            throw new Error('No open (')
        }

        if (input.includes('(') && input.includes(')')) {
            input = checkForScopes(input.match(mainRegex));
        }

        return input;
    } catch (e) {

    }
}

const calc = (expression = '') => {
    let input = new String(expression);

    const found = input.match(mainRegex);
    input = checkForScopes(found);

    if (input.match(regexMultiplay) || input.match(regexPlus)) {
        input = simpleOperations(input)
    }

    return input;
}

calc('(asd+2)+(2+we+(aaa+(ssda2+as*3*2)+ssa+aas*3)*2)*2');