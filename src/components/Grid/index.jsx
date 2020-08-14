import React from 'react';
import PropTypes from 'prop-types';
import { expandDts } from '../../lib/utils';
import './styles.scss';

const Grid = ({ children, dts }) => (
  <div data-testid="grid-wrapper" className="grid-component" {...expandDts(dts)}>
    {children}
  </div>
);

Grid.displayName = 'GridComponent';
Grid.propTypes = {
  /**
   * the children to be rendered
   */
  children: PropTypes.node,
  /**
   * data-test-selector of the grid
   */
  dts: PropTypes.string,
};

export default Grid;
