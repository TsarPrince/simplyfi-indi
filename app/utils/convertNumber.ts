/**
 *
 * @param string string to be formatted
 * @returns converts string to number, removing all non-digit characters except for the decimal point
 */
export default function convertNumber(string?: string) {
  return Number(string?.replace(/[^0-9.]/g, ""));
}
