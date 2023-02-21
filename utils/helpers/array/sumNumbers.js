export default function sumNumbers(arr) {
  return arr.reduce((acc, val) => {
    if (typeof val === "number" && !isNaN(val)) {
      return acc + val;
    } else {
      return acc;
    }
  }, 0);
}
