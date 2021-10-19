import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

const TypeaheadComponent = ({
  value,
  label,
  options,
  onChange,
  onInputChange,
  ...otherProps
}) => {
  const onSelect = (event, option) => {
    onChange({ target: { value: option } });
  };

  const onInputValueChange = (event, newInputValue, reason) => {
    if (reason === 'reset') {
      return false;
    }

    onInputChange({ target: { value: newInputValue } });
  };

  return (
    <Autocomplete
      freeSolo
      disableClearable
      options={options}
      onChange={onSelect}
      onInputChange={onInputValueChange}
      renderInput={(params) => (
        <TextField {...params} label={label} fullWidth />
      )}
      {...otherProps}
    />
  );
};

TypeaheadComponent.defaultProps = {
  value: '',
  options: [],
  onInputChange: () => {},
};

TypeaheadComponent.propTypes = {
  value: PropTypes.any,
  options: PropTypes.array,
  label: PropTypes.string.isRequired,
  onChange: (props, propName, componentName) => {
    if (!props.onChange && !props.onInputChange) {
      return new Error(
        `One of props 'onChange' or 'onInputChange' was not specified in '${componentName}'.`
      );
    }
  },
  onInputChange: (props, propName, componentName) => {
    if (!props.onChange && !props.onInputChange) {
      return new Error(
        `One of props 'onChange' or 'onInputChange' was not specified in '${componentName}'.`
      );
    }
  },
};

export default TypeaheadComponent;
