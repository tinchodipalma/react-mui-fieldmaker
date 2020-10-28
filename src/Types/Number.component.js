import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';
import { parseNumber } from '../FieldMaker.helpers';
import { NUMERIC_REGEX } from '../FieldMaker.constants';

const NumberComponent = ({
  value,
  label,
  onChange,
  isInteger,
  ...otherProps
}) => {
  const [fixedValue, setFixedValue] = useState(parseNumber(value, isInteger));

  const onValueChange = ({ target: { value } }) => {
    const replacedCommaValue = value.replace(',', '.');
    if (isInteger && replacedCommaValue.endsWith('.')) {
      return false;
    }

    if (!value.length) {
      onChange({ target: { value } });
      setFixedValue(null);
      return false;
    }

    const fixedEndingValue = replacedCommaValue.endsWith('.')
      ? replacedCommaValue.slice(0, -1)
      : replacedCommaValue;

    let newValue = replacedCommaValue;
    if (NUMERIC_REGEX.test(fixedEndingValue)) {
      newValue = parseNumber(fixedEndingValue, isInteger);
      onChange({ target: { value: newValue } });

      const newFixedValue =
        (replacedCommaValue.match(/\./g) || []).length < 2 &&
        replacedCommaValue.endsWith('.')
          ? replacedCommaValue
          : newValue.toString();

      setFixedValue(newFixedValue);
    }
  };

  return (
    <TextField
      label={label}
      value={fixedValue !== null ? fixedValue.toString() : ''}
      onChange={onValueChange}
      fullWidth
      {...otherProps}
    />
  );
};

NumberComponent.defaultProps = {
  value: '',
  isInteger: false,
};

NumberComponent.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  isInteger: PropTypes.bool,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default NumberComponent;
