import React from 'react';
import PropTypes from 'prop-types';
import { classSuffixHelper } from '../../lib/utils';
const base64UrlPrefix = 'data:image/svg+xml;base64,';
const SvgSymbol = props => {
  let isEncoded = false;
  const {
    classSuffixes,
    href,
    onClick,
    isCircle
  } = props;
  const suffixOptions = {
    clickable: props.onClick
  };
  const symbolBaseClass = 'aui--svg-symbol-component';
  const circleBaseClass = 'aui--svg-symbol-component-circle';
  const symbolClassesList = `${symbolBaseClass} ${classSuffixHelper({
    classSuffixes,
    suffixOptions,
    componentClass: symbolBaseClass
  })}`;
  const circleClassesList = `${circleBaseClass} ${classSuffixHelper({
    classSuffixes,
    componentClass: circleBaseClass
  })}`;
  if (href.indexOf(base64UrlPrefix) !== -1) {
    isEncoded = true;
  }
  const symbol = isEncoded ? /*#__PURE__*/React.createElement("div", {
    className: symbolClassesList,
    onClick: onClick
  }, /*#__PURE__*/React.createElement("img", {
    src: href,
    alt: "svg-symbol"
  })) : /*#__PURE__*/React.createElement("svg", {
    className: symbolClassesList,
    onClick: onClick
  }, /*#__PURE__*/React.createElement("use", {
    href: href,
    xlinkHref: href
  }));
  return isCircle ? /*#__PURE__*/React.createElement("div", {
    className: circleClassesList
  }, symbol) : symbol;
};
SvgSymbol.propTypes = {
  classSuffixes: PropTypes.arrayOf(PropTypes.string.isRequired),
  /**
   * accept both file path and base64 encoded string
   */
  href: PropTypes.string,
  onClick: PropTypes.func,
  isCircle: PropTypes.bool
};
SvgSymbol.defaultProps = {
  href: '',
  classSuffixes: [],
  isCircle: false
};
export default SvgSymbol;