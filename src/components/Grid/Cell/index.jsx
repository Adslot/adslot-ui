import React from 'react';
import PropTypes from 'prop-types';
import { expandDts, classSuffixHelper } from '../../../lib/utils';
import './styles.scss';

const GridCell = ({ children, classSuffixes, onClick, stretch, dts, addonClassNames }) => {
  const componentClass = 'grid-component-cell';
  const classesList = classSuffixHelper({
    classSuffixes,
    suffixOptions: {
      stretch,
      clickable: onClick,
    },
    componentClass,
  });
  const baseClassNames = `${componentClass}${classesList}`;
  const className = addonClassNames ? [baseClassNames, ...addonClassNames].join(' ') : baseClassNames;
  const extraProps = onClick ? { onClick } : {};

  return (
    <div className={className} {...extraProps} {...expandDts(dts)}>
      {children}
    </div>
  );
};

GridCell.displayName = 'GridCellComponent';

GridCell.propTypes = {
  addonClassNames: PropTypes.arrayOf(PropTypes.string),
  children: PropTypes.node,
  classSuffixes: PropTypes.arrayOf(PropTypes.string),
  dts: PropTypes.string,
  onClick: PropTypes.func,
  stretch: PropTypes.bool,
};

GridCell.defaultProps = {
  classSuffixes: [],
  stretch: false,
};

export default GridCell;
