export default function biddingTypeFormatter(data) {
  let res;
  switch (data) {
    case "MAXIMIZE_CONVERSIONS":
      res = "Maximize conversions";
      break;
    case "TARGET_SPEND":
      res = "Maximize clicks";
      break;
    case "-":
      res = "-";
      break;
    default:
      res = data;
      break;
  }
  return res;
}
