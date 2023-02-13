export default function getRandomColor() {
  const h = Math.floor(Math.random() * 360);
  const s = Math.floor(Math.random() * 20) + 80;
  const l = Math.floor(Math.random() * 100);
  return "hsl(" + h + "," + s + "%," + l + "%)";
}
