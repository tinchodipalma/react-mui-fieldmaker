import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { ButtonGroup, Button, Typography } from '@mui/material';

const GroupButton = ({ selectedValues, option, config, size, onClick }) => {
  const optionValue = option[config.valueKey] || 'no-value';
  const isSelected = selectedValues.indexOf(optionValue) >= 0;

  const buttonClassName = classnames(
    `GroupComponent__Button GroupComponent__Button--${optionValue}`,
    {
      'GroupComponent__Button--selected': isSelected,
    }
  );

  return (
    <Button
      className={buttonClassName}
      onClick={onClick(option)}
      variant="outlined"
      size={size}
    >
      {option[config.labelKey]}
    </Button>
  );
};

GroupButton.defaultProps = {
  selectedValues: [],
  size: 'small',
  config: {
    valueKey: 'id',
    labelKey: 'label',
  },
};

GroupButton.propTypes = {
  selectedValues: PropTypes.array,
  size: PropTypes.string,
  config: PropTypes.object,
  option: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};

const GroupComponent = ({
  value,
  max,
  dynamic,
  required,
  label,
  options,
  config,
  returnFirst,
  onChange,
  ...otherProps
}) => {
  const fixedMax = !isNaN(max) ? parseInt(max, 10) : 1;

  const [selectedValues, setSelectedValues] = useState(
    Array.isArray(value) ? value : [value]
  );

  const onButtonClick = (option, index) => () => {
    let newValues = [...selectedValues];

    const optionValue = option[config.valueKey];
    const optionIndex = newValues.indexOf(optionValue);

    if (optionIndex >= 0) {
      newValues.splice(optionIndex, 1);
    } else {
      let isPusheable = selectedValues.length < fixedMax;
      if (!isPusheable && dynamic) {
        // FIFO remove if dynamic
        newValues.splice(0, 1);
        isPusheable = true;
      }

      if (isPusheable) {
        newValues.push(optionValue);
      }
    }

    setSelectedValues(newValues);

    let onChangeValue = newValues;
    if (returnFirst) {
      onChangeValue =
        Array.isArray(newValues) && newValues.length ? newValues[0] : '';
    }

    onChange({ target: { value: onChangeValue } });
  };

  return (
    <div className="GroupComponent GroupComponent__Container">
      <Typography
        className="GroupComponent__Label"
        variant="caption"
        component="label"
      >
        {label} {required && '*'}
      </Typography>
      <ButtonGroup className="GroupComponent__ButtonsGroup" variant="outlined">
        {options.map((option, i) => (
          <GroupButton
            key={i}
            option={option}
            selectedValues={selectedValues}
            config={config}
            onClick={onButtonClick}
          />
        ))}
      </ButtonGroup>
    </div>
  );
};

GroupComponent.defaultProps = {
  value: [],
  max: 1,
  options: [],
  required: false,
  returnFirst: false,
  dynamic: true,
  config: {
    valueKey: 'id',
    labelKey: 'label',
  },
};

GroupComponent.propTypes = {
  value: PropTypes.any,
  max: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  options: PropTypes.array,
  required: PropTypes.bool,
  returnFirst: PropTypes.bool,
  dynamic: PropTypes.bool,
  config: PropTypes.object,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default GroupComponent;
