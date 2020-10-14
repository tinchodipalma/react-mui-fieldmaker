import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Autocomplete } from '@material-ui/lab';
import { TextField, Chip } from '@material-ui/core';

const TagsComponent = ({
  value,
  max,
  required,
  label,
  options,
  onChange,
  ...otherProps
}) => {
  const fixedMax = !isNaN(max) ? parseInt(max, 10) : 0;
  const fixedLabel = `${label} ${required ? '*' : ''}`;

  const [selectedValues, setSelectedValues] = useState(
    Array.isArray(value) ? value : [value]
  );

  const onAutocompleteChange = (event, newValues) => {
    if (fixedMax <= 0 || newValues.length <= fixedMax) {
      setSelectedValues(newValues);
      onChange({ target: { value: newValues } });
    }
  };

  return (
    <Autocomplete
      multiple
      freeSolo
      options={options}
      value={selectedValues}
      renderTags={(value, getTagProps) =>
        value.map((option, index) => (
          <Chip
            key={index}
            variant="outlined"
            color="primary"
            label={option}
            {...getTagProps({ index })}
          />
        ))
      }
      renderInput={(params) => <TextField {...params} label={fixedLabel} />}
      onChange={onAutocompleteChange}
    />
  );
};

TagsComponent.defaultProps = {
  value: [],
  max: 0,
  options: [],
  required: false,
};

TagsComponent.propTypes = {
  value: PropTypes.any,
  max: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  options: PropTypes.array,
  required: PropTypes.bool,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default TagsComponent;
