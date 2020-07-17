import _ from 'lodash';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { FlexibleSpacer } from 'adslot-ui';
import './styles.scss';

const baseClass = 'pagetitle-component';

const PageTitle = ({ children, isFooter, title }) => {
  const className = classnames(baseClass, { [`${baseClass}-is-footer`]: isFooter });
  return (
    <div className={className} id={_.kebabCase(title)}>
      {children ? (
        <span className="flexible-wrapper-inline">
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

PageTitle.displayName = 'PageTitleComponent';

PageTitle.propTypes = {
  children: PropTypes.node,
  isFooter: PropTypes.bool,
  title: PropTypes.node,
};
PageTitle.defaultProps = {
  isFooter: false,
};

export default PageTitle;
