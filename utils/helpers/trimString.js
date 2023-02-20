export default function trimString(str, number) {
  return str.length > number ? str.substring(0, number - 3) + "..." : str;
}
