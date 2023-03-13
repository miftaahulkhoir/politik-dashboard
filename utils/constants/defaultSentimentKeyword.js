const defaultSentimentKeyword = {
  clause: null,
  sub: {
    phrase: {
      case_sensitive: false,
      text: null,
    },
  },
};

Object.freeze(defaultSentimentKeyword);
export default defaultSentimentKeyword;
