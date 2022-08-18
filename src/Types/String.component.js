import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@mui/material';

const StringComponent = ({ value, label, onChange, ...otherProps }) => (
  <TextField
    label={label}
    value={value}
    onChange={onChange}
    fullWidth
    {...otherProps}
  />
);

StringComponent.defaultProps = {
  value: '',
};

StringComponent.propTypes = {
  value: PropTypes.string,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default StringComponent;
