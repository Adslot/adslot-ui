import SvgSymbol from 'components/alexandria/SvgSymbolComponent';
import React, { PropTypes } from 'react';

import classSuffixHelper from '../../helpers/classSuffixHelper';

require('styles/alexandria/SvgSymbolCircle.scss');

const SvgSymbolCircleComponent = (props) => {
  const componentClass = 'svgsymbolcircle-component';
  const classesList = classSuffixHelper({ classSuffixes: props.classSuffixes, componentClass });
  return (
    <div className={`${componentClass}${classesList}`}>
      <SvgSymbol classSuffixes={props.classSuffixes} href={props.href} {...props} />
    </div>
  );
};

SvgSymbolCircleComponent.displayName = 'AlexandriaSvgSymbolCircleComponent';

SvgSymbolCircleComponent.propTypes = {
  classSuffixes: SvgSymbol.propTypes.classSuffixes,
  href: PropTypes.string,
};

export default SvgSymbolCircleComponent;
