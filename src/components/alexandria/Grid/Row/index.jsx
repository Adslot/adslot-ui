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

GridRow.displayName = 'AlexandriaGridRowComponent';

GridRow.propTypes = {
  children: PropTypes.node,
  horizontalBorder: PropTypes.bool.isRequired,
  short: PropTypes.bool.isRequired,
  type: PropTypes.oneOf(['body', 'header', 'subfooter', 'footer']).isRequired,
  verticalCellBorder: PropTypes.bool.isRequired,
  dts: PropTypes.string,
};

GridRow.defaultProps = {
  horizontalBorder: true,
  short: false,
  type: 'body',
  verticalCellBorder: false,
};

export default GridRow;
