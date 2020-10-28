import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

const TypeaheadComponent = ({ value, label, options, ...otherProps }) => {
  return (
    <Autocomplete
      freeSolo
      disableClearable
      options={options}
      value={value}
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
};

export default TypeaheadComponent;
