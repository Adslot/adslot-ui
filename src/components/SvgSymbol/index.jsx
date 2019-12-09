import React from 'react';
import PropTypes from 'prop-types';
import { classSuffixHelper } from '../../lib/utils';
import './styles.scss';

const base64UrlPrefix = 'data:image/svg+xml;base64,';

const SvgSymbol = props => {
  let isEncoded = false;
  const { classSuffixes, href, onClick } = props;
  const componentClass = 'svg-symbol-component';
  const suffixOptions = { clickable: props.onClick };
  const classesList = classSuffixHelper({
    classSuffixes,
    suffixOptions,
    componentClass,
  });

  if (href.indexOf(base64UrlPrefix) !== -1) {
    isEncoded = true;
  }

  const className = `${componentClass}${classesList}`;

  return isEncoded ? (
    <div className={className} onClick={onClick}>
      <img src={href} />
    </div>
  ) : (
    <svg className={className} onClick={onClick}>
      <use href={href} xlinkHref={href} />
    </svg>
  );
};

SvgSymbol.displayName = 'SvgSymbolComponent';

SvgSymbol.propTypes = {
  classSuffixes: PropTypes.arrayOf(PropTypes.string.isRequired),
  href: PropTypes.string,
  onClick: PropTypes.func,
};

SvgSymbol.defaultProps = {
  href: '',
  classSuffixes: [],
};

export default SvgSymbol;
