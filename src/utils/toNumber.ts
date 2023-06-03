export const toNumber = (value: string): number => {
  return parseFloat(value.replace(',', '.'));
};
