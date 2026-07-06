export function numericFormatter(input: unknown, precision?: number) {
  const value = Number(input);

  if (isNaN(value)) {
    return '';
  }

  const stringValue = precision ? value.toFixed(precision) : value.toString();

  return stringValue.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}
