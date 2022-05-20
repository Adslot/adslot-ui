import React from 'react';
import PropTypes from 'prop-types';

var BorderedWell = function BorderedWell(_ref) {
  var children = _ref.children;
  return /*#__PURE__*/React.createElement("div", {
    className: "borderedwell-component"
  }, children);
};

BorderedWell.propTypes = {
  children: PropTypes.node
};
export default BorderedWell;