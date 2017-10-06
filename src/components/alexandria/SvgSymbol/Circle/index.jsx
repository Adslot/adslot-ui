import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import SvgSymbol from 'alexandria/SvgSymbol';
import { classSuffixHelper } from 'lib/utils';
import './styles.scss';

class SvgSymbolCircle extends PureComponent {
  render() {
    const { classSuffixes, href } = this.props;
    const componentClass = 'svgsymbolcircle-component';
    const classesList = classSuffixHelper({ classSuffixes, componentClass });
    return (
      <div className={`${componentClass}${classesList}`}>
        <SvgSymbol classSuffixes={classSuffixes} href={href} {...this.props} />
      </div>
    );
  }
}

SvgSymbolCircle.displayName = 'AlexandriaSvgSymbolCircleComponent';

SvgSymbolCircle.propTypes = {
  classSuffixes: SvgSymbol.propTypes.classSuffixes,
  href: PropTypes.string,
};

export default SvgSymbolCircle;
