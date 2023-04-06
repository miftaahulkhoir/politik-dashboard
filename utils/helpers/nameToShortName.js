const getFirstCharCapitalized = (string) => {
  return string.charAt(0).toUpperCase();
};

export const nameToShortName = (name) => {
  const wordList = name.trim().split(" ");

  if (wordList.length === 1) {
    return getFirstCharCapitalized(wordList[0]);
  } else if (wordList.length > 1) {
    const firstWord = wordList[0];
    const secondWord = wordList[1];

    return `${getFirstCharCapitalized(firstWord)}${getFirstCharCapitalized(secondWord)}`;
  } else {
    return "";
  }
};
