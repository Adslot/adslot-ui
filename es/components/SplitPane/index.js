import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { expandDts } from '../../lib/utils';

const SplitPane = _ref => {
  let {
    children,
    dts,
    additionalClassNames
  } = _ref;
  const splitPaneClass = classNames('splitpane-component', ...additionalClassNames);
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