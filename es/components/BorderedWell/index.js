import React from 'react';
import PropTypes from 'prop-types';
const BorderedWell = _ref => {
  let {
    children
  } = _ref;
  return /*#__PURE__*/React.createElement("div", {
    className: "borderedwell-component"
  }, children);
};
BorderedWell.propTypes = {
  children: PropTypes.node
};
export default BorderedWell;