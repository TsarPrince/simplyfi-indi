/**
 *
 * @param string string to be formatted
 * @returns string containing only digits and decimal place, every 3rd digit separated by comma
 */
export default function formatNumber(string?: string | number) {
  if (!string) return "";
  if (typeof string === "number") string = string.toString();
  return string.replace(/[^0-9.]/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
