import React from 'react';
import PropTypes from 'prop-types';
import SvgSymbol from 'alexandria/SvgSymbol';
import { classSuffixHelper } from 'lib/utils';
import './styles.scss';

const SvgSymbolCircle = props => {
  const componentClass = 'svgsymbolcircle-component';
  const classesList = classSuffixHelper({
    classSuffixes: props.classSuffixes,
    componentClass,
  });
  return (
    <div className={`${componentClass}${classesList}`}>
      <SvgSymbol classSuffixes={props.classSuffixes} href={props.href} {...props} />
    </div>
  );
};

SvgSymbolCircle.displayName = 'AlexandriaSvgSymbolCircleComponent';

SvgSymbolCircle.propTypes = {
  classSuffixes: SvgSymbol.propTypes.classSuffixes, // eslint-disable-line react/no-typos
  href: PropTypes.string,
};

export default SvgSymbolCircle;
