import PropTypes from 'prop-types';
import React from 'react';
import SelectComponent from './Select.component';

const HierarchicalSelectComponent = ({
  options,
  hierarchy,
  value,
  onChange,
  config,
  ...parentProps
}) => {
  const onSelectChange = (property, isIntegerValue) => ({
    target: { value: propertyValue },
  }) => {
    let updatedValue = {
      ...value,
      [property]: isIntegerValue ? parseInt(propertyValue) : propertyValue,
    };
    onChange({ target: { value: updatedValue } });
  };

  let selectsOutput = hierarchy.reduce(
    ({ selects, selectOptions }, select) => {
      let currentValue = value[select.id],
        CurrentSelect = (
          <SelectComponent
            {...parentProps}
            {...select}
            onChange={onSelectChange(
              select.id,
              selectOptions.length &&
                Number.isInteger(selectOptions[0][config.valueKey])
            )}
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
  hierarchy: [],
  required: false,
  withPickOneOption: true,
  pickOneOptionPrompt: 'Seleccione una opción',
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
  config: PropTypes.object,
  nonTrivialValue: PropTypes.bool,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  hierarchy: PropTypes.array.isRequired,
};

export default HierarchicalSelectComponent;
