export default function capitalizeWords(string) {
  try {
    return string.toLowerCase().replace(/(^|\s)\S/g, function (letter) {
      return letter.toUpperCase();
    });
  } catch (error) {
    return string;
  }
}
