import classnames from 'classnames';
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
  const className = classnames(`${componentClass}${classesList}`, ...addonClassNames);
  const extraProps = onClick ? { onClick } : {};

  return (
    <div className={className} {...extraProps} {...expandDts(dts)}>
      {children}
    </div>
  );
};

GridCell.displayName = 'GridCellComponent';

GridCell.propTypes = {
  /**
   * list of addOn classNames as array of strings
   */
  addonClassNames: PropTypes.arrayOf(PropTypes.string),
  /**
   * the children to be rendered
   */
  children: PropTypes.node,
  classSuffixes: PropTypes.arrayOf(PropTypes.string),
  /**
   * data-test-selector of the gridCell
   */
  dts: PropTypes.string,
  /**
   * function that will be called when gridCell is clicked
   */
  onClick: PropTypes.func,
  /**
   * determines if gridCell should be stretched
   */
  stretch: PropTypes.bool,
};

GridCell.defaultProps = {
  addonClassNames: [],
  classSuffixes: [],
  stretch: false,
};

export default GridCell;
