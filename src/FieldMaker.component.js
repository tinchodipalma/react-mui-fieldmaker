import React from 'react';
import PropTypes from 'prop-types';
import FIELD_MAKER_MAP from './FieldMaker.map';

import './FieldMaker.css';

const FieldMaker = ({ type, className, nonTrivialValue, ...otherProps }) => {
  const FieldComponent = FIELD_MAKER_MAP[type.toLowerCase()]
    ? FIELD_MAKER_MAP[type.toLowerCase()]
    : FIELD_MAKER_MAP.default;

  const containerClassName = `FieldMaker__Container ${className} FieldMaker--${type.toLowerCase()} FieldMaker--${
    nonTrivialValue ? 'nonTrivialValue' : 'trivialValue'
  }`;

  return (
    <div className={containerClassName}>
      <FieldComponent {...otherProps} />
    </div>
  );
};

FieldMaker.defaultProps = {
  type: 'default',
  className: 'FieldMaker__Default',
};

FieldMaker.propTypes = {
  type: PropTypes.string,
  className: PropTypes.string,
  nonTrivialValue: PropTypes.any,
};

export default FieldMaker;
