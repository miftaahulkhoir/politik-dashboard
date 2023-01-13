export default function capitalizeWords(string) {
  return string.toLowerCase().replace(/(^|\s)\S/g, function (letter) {
    return letter.toUpperCase();
  });
}
