import React from 'react';
import PropTypes from 'prop-types';
import { classSuffixHelper, expandDts } from '../../../lib/utils';
import './styles.css';

const GridRow = ({ horizontalBorder, short, type, verticalCellBorder, children, dts }) => {
  const componentClass = 'grid-component-row';
  const classesList = classSuffixHelper({
    classSuffixes: [type],
    suffixOptions: { horizontalBorder, short, verticalCellBorder },
    componentClass,
  });

  return (
    <div data-testid="grid-row-wrapper" className={`${componentClass}${classesList}`} {...expandDts(dts)}>
      {children}
    </div>
  );
};

GridRow.propTypes = {
  /**
   * the children to be rendered
   */
  children: PropTypes.node,
  /**
   * determines if horizontalBorder is to be rendered
   */
  horizontalBorder: PropTypes.bool,
  /**
   * determines if the row is short or long
   */
  short: PropTypes.bool,
  /**
   * determines the type of griRow: oneOf(['body', 'header', 'subfooter', 'footer'])
   */
  type: PropTypes.oneOf(['body', 'header', 'subfooter', 'footer']),
  /**
   * determines if verticalCellBorder should be displayed
   */
  verticalCellBorder: PropTypes.bool,
  /**
   * data-test-selector of the grid
   */
  dts: PropTypes.string,
};

GridRow.defaultProps = {
  horizontalBorder: true,
  short: false,
  type: 'body',
  verticalCellBorder: false,
};

export default GridRow;
