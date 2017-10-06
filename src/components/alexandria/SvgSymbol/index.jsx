import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { classSuffixHelper } from 'lib/utils';
import './styles.scss';

class SvgSymbol extends PureComponent {
  render() {
    const { classSuffixes, href, onClick } = this.props;
    const componentClass = 'svg-symbol-component';
    const suffixOptions = { clickable: onClick };
    const classesList = classSuffixHelper({ classSuffixes, suffixOptions, componentClass });

    return (
      <svg className={`${componentClass}${classesList}`} onClick={onClick}>
        <use href={href} />
      </svg>
    );
  }
}

SvgSymbol.displayName = 'AlexandriaSvgSymbolComponent';

SvgSymbol.propTypes = {
  classSuffixes: PropTypes.arrayOf(PropTypes.string.isRequired),
  href: PropTypes.string,
  onClick: PropTypes.func,
};

SvgSymbol.defaultProps = {
  classSuffixes: [],
};

export default SvgSymbol;
