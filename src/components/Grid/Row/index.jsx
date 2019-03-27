import React from 'react';
import PropTypes from 'prop-types';
import { classSuffixHelper, expandDts } from 'lib/utils';
import './styles.scss';

const GridRow = ({ horizontalBorder, short, type, verticalCellBorder, children, dts }) => {
  const componentClass = 'grid-component-row';
  const classesList = classSuffixHelper({
    classSuffixes: [type],
    suffixOptions: { horizontalBorder, short, verticalCellBorder },
    componentClass,
  });

  return (
    <div className={`${componentClass}${classesList}`} {...expandDts(dts)}>
      {children}
    </div>
  );
};

GridRow.displayName = 'GridRowComponent';

GridRow.propTypes = {
  children: PropTypes.node,
  horizontalBorder: PropTypes.bool,
  short: PropTypes.bool,
  type: PropTypes.oneOf(['body', 'header', 'subfooter', 'footer']),
  verticalCellBorder: PropTypes.bool,
  dts: PropTypes.string,
};

GridRow.defaultProps = {
  horizontalBorder: true,
  short: false,
  type: 'body',
  verticalCellBorder: false,
};

export default GridRow;
