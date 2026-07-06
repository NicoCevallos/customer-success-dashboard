export function dateFormatter(date?: string): string {
  if (!date) {
    return '';
  }

  return date.substring(0, 10);
}
