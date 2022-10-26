import React from 'react';
import PropTypes from 'prop-types';

const Statistic = _ref => {
  let {
    label,
    value,
    inline
  } = _ref;
  const baseClass = 'statistic-component';
  const statisticClassNames = [baseClass];
  if (inline) statisticClassNames.push('inline');
  return /*#__PURE__*/React.createElement("label", {
    className: statisticClassNames.join(' ')
  }, /*#__PURE__*/React.createElement("div", {
    className: `${baseClass}-value`
  }, value), /*#__PURE__*/React.createElement("div", {
    className: `${baseClass}-label`
  }, label));
};

Statistic.propTypes = {
  /**
   * 	Horizontal layout as opposed to stacked.
   */
  inline: PropTypes.bool,

  /**
   * Preferred TitleCase (aka. PascalCase, StartCase)
   */
  label: PropTypes.string.isRequired,

  /**
   * Where value is a number consider human readable strings e.g 'Million' instead of 000,000.
   */
  value: PropTypes.string.isRequired
};
Statistic.defaultProps = {
  inline: false
};
export default Statistic;