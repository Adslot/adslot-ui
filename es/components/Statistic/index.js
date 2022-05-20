import React from 'react';
import PropTypes from 'prop-types';

var Statistic = function Statistic(_ref) {
  var label = _ref.label,
      value = _ref.value,
      inline = _ref.inline;
  var baseClass = 'statistic-component';
  var statisticClassNames = [baseClass];
  if (inline) statisticClassNames.push('inline');
  return /*#__PURE__*/React.createElement("label", {
    className: statisticClassNames.join(' ')
  }, /*#__PURE__*/React.createElement("div", {
    className: "".concat(baseClass, "-value")
  }, value), /*#__PURE__*/React.createElement("div", {
    className: "".concat(baseClass, "-label")
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