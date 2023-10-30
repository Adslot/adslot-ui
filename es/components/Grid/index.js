import React from 'react';
import PropTypes from 'prop-types';
import { expandDts } from '../../utils';
const Grid = ({
  children,
  dts
}) => /*#__PURE__*/React.createElement("div", Object.assign({
  className: "grid-component"
}, expandDts(dts)), children);
Grid.propTypes = {
  /**
   * the children to be rendered
   */
  children: PropTypes.node,
  /**
   * data-test-selector of the grid
   */
  dts: PropTypes.string
};
export default Grid;