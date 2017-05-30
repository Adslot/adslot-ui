import React, { PropTypes } from 'react';
import classSuffixHelper from '../../../../helpers/classSuffixHelper';
import expandDts from '../../../../helpers/expandDtsHelper';
import './styles.scss';

const GridCell = ({ children, classSuffixes, onClick, stretch, dts }) => {
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

GridCell.displayName = 'AlexandriaGridCellComponent';

GridCell.propTypes = {
  children: PropTypes.node,
  classSuffixes: PropTypes.arrayOf(PropTypes.string).isRequired,
  onClick: PropTypes.func,
  stretch: PropTypes.bool.isRequired,
  dts: PropTypes.string,
};

GridCell.defaultProps = {
  classSuffixes: [],
  stretch: false,
};

export default GridCell;
