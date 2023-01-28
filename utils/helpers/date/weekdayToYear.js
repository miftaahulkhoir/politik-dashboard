export default function weekdayToYear(dateString) {
  try {
    const date = new Date(dateString);
    const result = new Intl.DateTimeFormat("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);

    return result;
  } catch (error) {
    return "";
  }
}
