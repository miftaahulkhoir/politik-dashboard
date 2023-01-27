export default function dayMonthYear(dateString) {
  try {
    const date = new Date(dateString);
    const result = new Intl.DateTimeFormat("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(date);

    return result;
  } catch (error) {
    return "";
  }
}
