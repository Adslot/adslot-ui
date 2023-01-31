import _ from 'lodash';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import FlexibleSpacer from '../FlexibleSpacer';
const baseClass = 'pagetitle-component';
const PageTitle = _ref => {
  let {
    children,
    isFooter,
    title
  } = _ref;
  const className = classnames(baseClass, {
    [`${baseClass}-is-footer`]: isFooter
  });
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