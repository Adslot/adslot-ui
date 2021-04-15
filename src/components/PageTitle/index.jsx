import _ from 'lodash';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import FlexibleSpacer from '../FlexibleSpacer';
import './styles.scss';

const baseClass = 'pagetitle-component';

const PageTitle = ({ children, isFooter, title }) => {
  const className = classnames(baseClass, { [`${baseClass}-is-footer`]: isFooter });
  return (
    <div data-testid="page-title-wrapper" className={className} id={_.isString(title) ? _.kebabCase(title) : 'title'}>
      {children ? (
        <span data-testid="page-title-inline" className="flexible-wrapper-inline">
          {title}
          <FlexibleSpacer />
          {children}
        </span>
      ) : (
        title
      )}
    </div>
  );
};

PageTitle.propTypes = {
  children: PropTypes.node,
  isFooter: PropTypes.bool,
  title: PropTypes.node,
};
PageTitle.defaultProps = {
  isFooter: false,
};

export default PageTitle;
