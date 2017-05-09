import React, { PropTypes } from 'react';
import expandDts from '../../helpers/expandDtsHelper';

require('styles/alexandria/Grid.scss');

const GridComponent = ({ children, dts }) =>
  <div className="grid-component" {...expandDts(dts)}>
    {children}
  </div>;

GridComponent.displayName = 'AlexandriaGridComponent';
GridComponent.propTypes = {
  children: PropTypes.node,
  dts: PropTypes.string,
};

export default GridComponent;
