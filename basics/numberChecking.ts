const odds = {decimal: 15.2, numerator: 71, denominator: 5}

const { decimal, numerator = 0, denominator = 0 } = odds;

const isNotANumber = [numerator, denominator].find((x) => {
    console.log('x', x);
    let y = Number.isNaN(Number.parseFloat(`${x}`));
    console.log('y', y);
    return y
});

const NON_DETERMINISTIC_PRICE = 'TBD';
const displayOddsAsFraction = false;

const ODDS = (odds: any, options?: { roundDown: boolean }): string => {
    // Do nothing with strings.
    if (typeof odds === 'string') {
      return odds;
    }
    // Must be an object.
    if (!odds || typeof odds !== 'object' || Array.isArray(odds)) {
      return NON_DETERMINISTIC_PRICE;
    }
    // Format odds.
    const { decimal, numerator = 0, denominator = 0 } = odds;
    const checkForNumeratorDenominator = displayOddsAsFraction || !decimal;
    const isNotANumber = [numerator, denominator].find((x) => Number.isNaN(Number.parseFloat(`${x}`)));
    if (checkForNumeratorDenominator && (!numerator || !denominator || isNotANumber)) {
      return NON_DETERMINISTIC_PRICE;
    }

    if (displayOddsAsFraction) { return `${numerator}/${denominator}`; }

    if (decimal && Number.isNaN(Number.parseFloat(`${decimal}`))) { return NON_DETERMINISTIC_PRICE; }

    return decimal; //? this.DECIMALODDS(decimal, { roundDown: options?.roundDown }) : this.DECIMALODDS(numerator / denominator + 1);
  }

let x = ODDS(odds);
console.log('x', x);

// @ts-ignore
const z = Number(undefined + 2);
console.log('z', z)

const bottom: undefined | number = 0;
const bottom2: undefined | number = undefined;
const v = bottom ? bottom / 2 : 0;
const y = bottom2 ? bottom2 / 2 : 0;
console.log('v', v);
console.log('y', y);