export default function indexMaxOfNumbers(numbers) {
  const cleanNumbers = numbers.map((n) => (!n ? 0 : n)); // replace null and undefined with 0
  const maxNumber = Math.max(...cleanNumbers); // find the largest number
  const index = numbers.indexOf(maxNumber); // find the index of the largest number
  if (maxNumber === 0) {
    return null;
  }
  return index;
}
