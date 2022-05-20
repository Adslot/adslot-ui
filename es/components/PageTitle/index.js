import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _ from 'lodash';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import FlexibleSpacer from '../FlexibleSpacer';
var baseClass = 'pagetitle-component';

var PageTitle = function PageTitle(_ref) {
  var children = _ref.children,
      isFooter = _ref.isFooter,
      title = _ref.title;
  var className = classnames(baseClass, _defineProperty({}, "".concat(baseClass, "-is-footer"), isFooter));
  return /*#__PURE__*/React.createElement("div", {
    className: className,
    id: _.isString(title) ? _.kebabCase(title) : 'title'
  }, children ? /*#__PURE__*/React.createElement("span", {
    className: "flexible-wrapper-inline"
  }, title, /*#__PURE__*/React.createElement(FlexibleSpacer, null), children) : title);
};

PageTitle.propTypes = {
  children: PropTypes.node,
  isFooter: PropTypes.bool,
  title: PropTypes.node
};
PageTitle.defaultProps = {
  isFooter: false
};
export default PageTitle;