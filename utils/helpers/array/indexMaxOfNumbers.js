export default function indexMaxOfNumbers(numbers) {
  const cleanNumbers = numbers.map((n) => (!n ? 0 : n)); // replace null and undefined with 0
  const maxNumber = Math.max(...cleanNumbers); // find the largest number
  console.log("numbers", numbers, maxNumber);
  const index = numbers.indexOf(maxNumber); // find the index of the largest number
  return index;
}
