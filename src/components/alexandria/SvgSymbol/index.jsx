import React from 'react';
import PropTypes from 'prop-types';
import classSuffixHelper from '../../../helpers/classSuffixHelper';
import './styles.scss';

const SvgSymbol = (props) => {
  const { classSuffixes, href, onClick } = props;
  const componentClass = 'svg-symbol-component';
  const suffixOptions = { clickable: props.onClick };
  const classesList = classSuffixHelper({ classSuffixes, suffixOptions, componentClass });

  return (
    <svg className={`${componentClass}${classesList}`} onClick={onClick}>
      <use xlinkHref={href} />
    </svg>
  );
};

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
