export default function format(date) {
  const options = {
    weekday: "short", // Thu
    day: "numeric", // 23
    month: "long", // October
    year: "numeric", // 2025
    hour: "numeric", // 11
    minute: "2-digit" // 56
  };

  const formatted = new Intl.DateTimeFormat("en-US", options).format(date);
  return formatted;
}
