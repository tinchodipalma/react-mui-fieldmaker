import React from 'react';
import PropTypes from 'prop-types';
import { FormControlLabel, Switch } from '@mui/material';

const BooleanWithLabel = ({ label, children }) => (
  <FormControlLabel control={children} label={label} color="primary" />
);

BooleanWithLabel.propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

const BooleanComponent = ({
  checked,
  value,
  label,
  onChange,
  ...otherProps
}) => {
  const BooleanWrapper =
    label && label.length ? BooleanWithLabel : React.Fragment;

  const onBooleanChange = (event) => {
    const booleanValue = value ? false : true;
    onChange({
      ...event,
      target: { value: booleanValue },
    });
  };

  return (
    <BooleanWrapper label={label}>
      <Switch checked={checked} onChange={onBooleanChange} {...otherProps} />
    </BooleanWrapper>
  );
};

BooleanComponent.defaultProps = {
  checked: false,
  label: '',
  value: false,
};

BooleanComponent.propTypes = {
  checked: PropTypes.bool,
  label: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func.isRequired,
};

export default BooleanComponent;
