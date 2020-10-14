import React from 'react';
import PropTypes from 'prop-types';
import { Select, FormControl, InputLabel } from '@material-ui/core';

const SelectWithLabel = ({ label, children, required }) => (
  <FormControl fullWidth required={required}>
    <InputLabel shrink>{label}</InputLabel>
    {children}
  </FormControl>
);

SelectWithLabel.defaultProps = {
  required: false,
};

SelectWithLabel.propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  required: PropTypes.bool,
};

const SelectComponent = ({
  value,
  label,
  required,
  options,
  config,
  onChange,
  nonTrivialValue,
  ...otherProps
}) => {
  const SelectWrapper =
    label && label.length ? SelectWithLabel : React.Fragment;

  return (
    <SelectWrapper label={label} required={required}>
      <Select
        label={label}
        value={value || ''}
        onChange={onChange}
        native
        fullWidth
        {...otherProps}
      >
        {(!value || !value.length) && <option>Seleccione una opción</option>}
        {options.map((option, i) => (
          <option key={i} value={option[config.valueKey]}>
            {option[config.labelKey]}
          </option>
        ))}
      </Select>
    </SelectWrapper>
  );
};

SelectComponent.defaultProps = {
  value: '',
  options: [],
  required: false,
  config: {
    valueKey: 'id',
    labelKey: 'label',
  },
};

SelectComponent.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  options: PropTypes.array,
  required: PropTypes.bool,
  config: PropTypes.object,
  nonTrivialValue: PropTypes.bool,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SelectComponent;
