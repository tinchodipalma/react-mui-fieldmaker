import React from 'react';
import PropTypes from 'prop-types';
import { TextField, Autocomplete } from '@mui/material';
import { parseNumber } from '../FieldMaker.helpers';
import { NUMERIC_REGEX } from '../FieldMaker.constants';

const NumberTypeaheadComponent = ({
  inputValue,
  label,
  options,
  onInputChange,
  isInteger,
  ...otherProps
}) => {
  let parsedValue = parseNumber(inputValue, isInteger);

  const onValueChange = (event, val) => {
    if (!event) {
      return false;
    }

    let {
      target: { value },
    } = event;

    value = val || value;

    const replacedCommaValue = value.replace(',', '.');
    if (isInteger && replacedCommaValue.endsWith('.')) {
      return false;
    }

    if (!value.length) {
      onInputChange({ target: { value } });
      return false;
    }

    const fixedEndingValue = replacedCommaValue.endsWith('.')
      ? replacedCommaValue.slice(0, -1)
      : replacedCommaValue;

    let newValue = replacedCommaValue;
    if (NUMERIC_REGEX.test(fixedEndingValue)) {
      newValue = parseNumber(fixedEndingValue, isInteger);
      onInputChange({ target: { value: newValue } });
    }
  };

  return (
    <Autocomplete
      freeSolo
      disableClearable
      options={options}
      inputValue={parsedValue !== null ? parsedValue.toString() : ''}
      onInputChange={onValueChange}
      renderInput={(params) => (
        <TextField label={label} fullWidth {...params} />
      )}
      {...otherProps}
    />
  );
};

NumberTypeaheadComponent.defaultProps = {
  inputValue: '',
  isInteger: false,
  options: [],
};

NumberTypeaheadComponent.propTypes = {
  inputValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  options: PropTypes.array,
  isInteger: PropTypes.bool,
  label: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
};

export default NumberTypeaheadComponent;
