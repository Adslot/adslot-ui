import React, { PropTypes } from 'react';
import expandDts from '../../../helpers/expandDtsHelper';
import './styles.scss';

const Grid = ({ children, dts }) =>
  <div className="grid-component" {...expandDts(dts)}>
    {children}
  </div>;

Grid.displayName = 'AlexandriaGridComponent';
Grid.propTypes = {
  children: PropTypes.node,
  dts: PropTypes.string,
};

export default Grid;
