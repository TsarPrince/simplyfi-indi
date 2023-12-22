export default function pascalCase(str?: string): string | undefined {
  return str
    ?.split(/[^a-zA-Z0-9]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
}
