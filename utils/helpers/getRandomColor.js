export default function getRandomColor() {
  const h = Math.floor(Math.random() * 360);
  const s = Math.floor(Math.random() * 30) + 70;
  const l = Math.floor(Math.random() * 100);
  return "hsl(" + h + "," + s + "%," + l + "%)";
}
