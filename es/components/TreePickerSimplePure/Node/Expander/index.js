import PropTypes from 'prop-types';
import React from 'react';
import GridCell from '../../../Grid/Cell';
import Spinner from '../../../Spinner';
const TreePickerNodeExpander = ({
  isLoading,
  onClick
}) => {
  const props = {
    dts: 'expander',
    onClick: isLoading ? null : onClick
  };
  return /*#__PURE__*/React.createElement(GridCell, props, isLoading ? /*#__PURE__*/React.createElement(Spinner, {
    size: "small"
  }) : /*#__PURE__*/React.createElement("div", {
    className: "treepickernode-component-expander"
  }));
};
TreePickerNodeExpander.propTypes = {
  isLoading: PropTypes.bool,
  onClick: PropTypes.func.isRequired
};
TreePickerNodeExpander.defaultProps = {
  isLoading: false
};
export default TreePickerNodeExpander;