import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';

const PasswordComponent = ({ value, label, onChange, ...otherProps }) => (
  <TextField
    label={label}
    value={value}
    onChange={onChange}
    type="password"
    fullWidth
    {...otherProps}
  />
);

PasswordComponent.defaultProps = {
  value: '',
};

PasswordComponent.propTypes = {
  value: PropTypes.string,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default PasswordComponent;
