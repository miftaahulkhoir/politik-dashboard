export default function hhmm(time) {
  try {
    const date = new Date(time);
    const result = new Intl.DateTimeFormat("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);

    return result;
  } catch (error) {
    return "";
  }
}
