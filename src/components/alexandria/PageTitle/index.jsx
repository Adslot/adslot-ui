import React, { PropTypes } from 'react';
import FlexibleSpacer from 'components/alexandria/FlexibleSpacer';
import './styles.scss';

const baseClass = 'pagetitle-component';

const PageTitle = ({ children, isFooter, title }) => {
  const className = isFooter ? `${baseClass} ${baseClass}-is-footer` : baseClass;
  return (
    <div className={className}>
      {children ? <span className="flexible-wrapper-inline">{title}<FlexibleSpacer />{children}</span> : title}
    </div>
  );
};

PageTitle.displayName = 'AlexandriaPageTitleComponent';

PageTitle.propTypes = {
  children: PropTypes.node,
  isFooter: PropTypes.bool.isRequired,
  title: PropTypes.node,
};
PageTitle.defaultProps = {
  isFooter: false,
};

export default PageTitle;
