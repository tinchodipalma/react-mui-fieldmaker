import PropTypes from 'prop-types';
import React from 'react';
import SelectComponent from './Select.component';

const HierarchicalSelectComponent = ({
  options,
  selectHierarchy,
  value,
  onChange,
  config,
  ...parentProps
}) => {
  const onSelectChange = (property) => ({
    target: { value: propertyValue },
  }) => {
    let updatedValue = { ...value, [property]: propertyValue };
    onChange({ target: { value: updatedValue } });
  };

  let selectsOutput = selectHierarchy.reduce(
    ({ selects, selectOptions }, select) => {
      let currentValue = value[select.key],
        CurrentSelect = (
          <SelectComponent
            {...parentProps}
            {...select}
            onChange={onSelectChange(select.key)}
            value={currentValue}
            options={selectOptions}
            config={config}
            disabled={!selectOptions || !selectOptions.length}
          />
        ),
        currentValueOption = selectOptions.find((s) => s.id === currentValue),
        nextSelectOptions =
          (currentValueOption && currentValueOption.options) || [];
      return {
        selects: [...selects, CurrentSelect],
        selectOptions: nextSelectOptions,
      };
    },
    { selects: [], selectOptions: options }
  );

  return <React.Fragment>{selectsOutput.selects}</React.Fragment>;
};

HierarchicalSelectComponent.defaultProps = {
  value: {},
  options: [],
  selectHierarchy: [],
  required: false,
  withPickOneOption: true,
  pickOneOptionValue: '',
  config: {
    valueKey: 'id',
    labelKey: 'name',
  },
};

HierarchicalSelectComponent.propTypes = {
  value: PropTypes.object,
  options: PropTypes.array,
  required: PropTypes.bool,
  withPickOneOption: PropTypes.bool,
  pickOneOptionValue: PropTypes.any,
  config: PropTypes.object,
  nonTrivialValue: PropTypes.bool,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  selectHierarchy: PropTypes.array.isRequired,
};

export default HierarchicalSelectComponent;
