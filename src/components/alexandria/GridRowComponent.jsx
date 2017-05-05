import React, { PropTypes } from 'react';

import classSuffixHelper from '../../helpers/classSuffixHelper';
import expandDts from '../../helpers/expandDtsHelper';

require('styles/alexandria/GridRow.scss');

const GridRowComponent = ({ horizontalBorder, short, type, verticalCellBorder, children, dts }) => {
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

GridRowComponent.displayName = 'AlexandriaGridRowComponent';

GridRowComponent.propTypes = {
  children: PropTypes.node,
  horizontalBorder: PropTypes.bool.isRequired,
  short: PropTypes.bool.isRequired,
  type: PropTypes.oneOf(['body', 'header', 'subfooter', 'footer']).isRequired,
  verticalCellBorder: PropTypes.bool.isRequired,
  dts: PropTypes.string,
};

GridRowComponent.defaultProps = {
  horizontalBorder: true,
  short: false,
  type: 'body',
  verticalCellBorder: false,
};

export default GridRowComponent;
