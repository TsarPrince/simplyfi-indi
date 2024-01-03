/**
 *
 * @param string string to be formatted
 * @returns string containing only digits, every 3rd digit separated by comma
 */
export default function formatNumber(string?: string) {
  return string?.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
