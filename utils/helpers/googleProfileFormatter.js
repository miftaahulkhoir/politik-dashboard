export default function googleProfileFormatter(data) {
  const res = data.slice(0, 3) + "-" + data.slice(3, 6) + "-" + data.slice(-4);
  return res;
}
