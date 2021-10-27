const getNumberFromString = (str) => parseInt(str.replace(/[^0-9]/g, ''), 10) || '';

const getNumberWithSpaces = (number) => {
  const chars = [...number.toString()];

  if (chars.length !== 0) {
    const stringWithSpace = chars.reduceRight((acc, char, index, array) => {
      const spaceOrNothing = (array.length - index) % 3 === 0 ? ' ' : '';

      return spaceOrNothing + char + acc;
    });

    const result = stringWithSpace[0] === ' ' ? stringWithSpace.slice(1) : stringWithSpace;

    return result;
  }

  return '0';
};

const getMonthlyPayment = (sum, rate, years) => {
  const periods = years * 12;

  return parseInt(sum * (rate + rate / (Math.pow(1 + rate, periods) - 1)), 10);
};

const getWordFromYearsNumber = (number) => {
  const chars = [...number.toString()];
  const char = chars[chars.length - 1];

  if (number > 4 && number < 21) {
    return 'лет';
  }

  if (char === '1' ) {
    return 'год';
  }

  if (char === '2' || char === '3' || char === '4') {
    return 'года';
  }

  return 'лет';
};

export {getNumberFromString, getNumberWithSpaces, getMonthlyPayment, getWordFromYearsNumber};
