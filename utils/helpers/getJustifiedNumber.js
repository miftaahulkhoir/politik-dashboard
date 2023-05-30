const justifiedNumber = (number) => {
  const stringifyNumber = number.toString();
  const numberLength = stringifyNumber.length;

  if (numberLength > 4) {
    const startNumber = parseInt(stringifyNumber.substring(0, 2));
    return startNumber * Math.pow(10, numberLength - 2);
  }

  const startNumber = parseInt(stringifyNumber.substring(0, 1));
  return startNumber * Math.pow(10, numberLength - 1);
};

export default justifiedNumber;
