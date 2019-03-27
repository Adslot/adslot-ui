import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import FlexibleSpacer from 'components/FlexibleSpacer';
import './styles.scss';

const baseClass = 'pagetitle-component';

const PageTitle = ({ children, isFooter, title }) => {
  const className = isFooter ? `${baseClass} ${baseClass}-is-footer` : baseClass;
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
