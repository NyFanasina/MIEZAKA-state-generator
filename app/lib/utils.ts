export function formatDateToFr(date: Date, format = "FR") {
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  };

  const formatter = new Intl.DateTimeFormat(format, options);
  return formatter.format(date);
}
