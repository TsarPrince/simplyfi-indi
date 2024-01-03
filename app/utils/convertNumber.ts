/**
 *
 * @param string string to be formatted
 * @returns converts string to number, removing all non-digit characters
 */
export default function convertNumber(string?: string) {
  return Number(string?.replace(/\D/g, ""));
}
