export default function formateDateTime(dateString, options) {
  try {
    const date = new Date(dateString);
    const result = new Intl.DateTimeFormat("id-ID", options).format(date);

    return result;
  } catch (error) {
    return "";
  }
}
