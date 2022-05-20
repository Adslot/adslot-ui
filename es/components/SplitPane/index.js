import _toConsumableArray from "@babel/runtime/helpers/toConsumableArray";
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { expandDts } from '../../lib/utils';

var SplitPane = function SplitPane(_ref) {
  var children = _ref.children,
      dts = _ref.dts,
      additionalClassNames = _ref.additionalClassNames;
  var splitPaneClass = classNames.apply(void 0, ['splitpane-component'].concat(_toConsumableArray(additionalClassNames)));
  return /*#__PURE__*/React.createElement("div", Object.assign({
    className: splitPaneClass
  }, expandDts(dts)), children);
};

SplitPane.propTypes = {
  additionalClassNames: PropTypes.arrayOf(PropTypes.string),
  children: PropTypes.node,

  /**
   * 	render `data-test-selector` onto the component. It can be useful for testing.
   */
  dts: PropTypes.string
};
SplitPane.defaultProps = {
  additionalClassNames: []
};
export default SplitPane;