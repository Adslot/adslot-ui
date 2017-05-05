import React, { PropTypes } from 'react';

import classSuffixHelper from '../../helpers/classSuffixHelper';
import expandDts from '../../helpers/expandDtsHelper';

require('styles/alexandria/GridCell.scss');

const GridCellComponent = ({ children, classSuffixes, onClick, stretch, dts }) => {
  const componentClass = 'grid-component-cell';
  const classesList = classSuffixHelper({
    classSuffixes,
    suffixOptions: {
      stretch,
      clickable: onClick,
    },
    componentClass,
  });
  const extraProps = onClick ? { onClick } : {};

  return (
    <div className={`${componentClass}${classesList}`} {...extraProps} {...expandDts(dts)}>
      {children}
    </div>
  );
};

GridCellComponent.displayName = 'AlexandriaGridCellComponent';

GridCellComponent.propTypes = {
  children: PropTypes.node,
  classSuffixes: PropTypes.arrayOf(PropTypes.string).isRequired,
  onClick: PropTypes.func,
  stretch: PropTypes.bool.isRequired,
  dts: PropTypes.string,
};

GridCellComponent.defaultProps = {
  classSuffixes: [],
  stretch: false,
};

export default GridCellComponent;
