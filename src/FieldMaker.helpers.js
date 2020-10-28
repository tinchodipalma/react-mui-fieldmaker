export const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export const parseNumber = (value, isInteger) => {
  let numericValue = null;
  if (typeof value === 'number') {
    numericValue = value;
  } else if (typeof value === 'string' && value.length) {
    numericValue = isInteger ? parseInt(value, 10) : parseFloat(value);
  }

  return numericValue;
};
