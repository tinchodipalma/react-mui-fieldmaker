import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox, FormControlLabel } from '@mui/material';

const CheckboxWithLabel = ({ label, children }) => (
  <FormControlLabel control={children} label={label} />
);

CheckboxWithLabel.propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

const CheckboxComponent = ({ checked, disabled, label, onChange }) => {
  const CheckboxWrapper =
    label && label.length ? CheckboxWithLabel : React.Fragment;

  return (
    <CheckboxWrapper label={label}>
      <Checkbox checked={checked} onChange={onChange} disabled={disabled} />
    </CheckboxWrapper>
  );
};

CheckboxComponent.defaultProps = {
  checked: false,
  disabled: false,
};

CheckboxComponent.propTypes = {
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default CheckboxComponent;
