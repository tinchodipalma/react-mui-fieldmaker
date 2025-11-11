import React from 'react';
import PropTypes from 'prop-types';
import { FormControl, InputLabel, FormGroup } from '@mui/material';
import CheckboxComponent from './Checkbox.component';

const MultipleWithLabel = ({ label, children }) => (
  <FormControl fullWidth>
    <InputLabel shrink>{label}</InputLabel>
    <div className="Multiple__Options">{children}</div>
  </FormControl>
);

MultipleWithLabel.propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

const MultipleComponent = ({
  selectedOptions,
  label,
  options,
  config,
  onChange,
  ...otherProps
}) => {
  const MultipleWrapper =
    label && label.length ? MultipleWithLabel : React.Fragment;

  const onCheckboxChange = (value) => () => {
    onChange({ target: { value } });
  };

  return (
    <MultipleWrapper label={label}>
      <FormGroup>
        {options.map((option, i) => (
          <CheckboxComponent
            key={i}
            {...option}
            label={option[config.labelKey]}
            checked={selectedOptions.indexOf(option[config.valueKey]) >= 0}
            onChange={onCheckboxChange(option[config.valueKey])}
            {...otherProps}
          />
        ))}
      </FormGroup>
    </MultipleWrapper>
  );
};

MultipleComponent.defaultProps = {
  selectedOptions: [],
  options: [],
  config: {
    valueKey: 'id',
    labelKey: 'label',
  },
};

MultipleComponent.propTypes = {
  selectedOptions: PropTypes.array,
  options: PropTypes.array,
  config: PropTypes.object,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default MultipleComponent;
