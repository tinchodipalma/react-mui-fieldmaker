import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

const TypeaheadComponent = ({
  value,
  label,
  options,
  onChange,
  onChange,
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
};

TypeaheadComponent.propTypes = {
  value: PropTypes.any,
  options: PropTypes.array,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default TypeaheadComponent;
