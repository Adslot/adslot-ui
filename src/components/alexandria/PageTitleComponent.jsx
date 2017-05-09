import React, { PropTypes } from 'react';
import FlexibleSpacer from 'components/alexandria/FlexibleSpacerComponent';

require('styles/alexandria/PageTitle.scss');

const baseClass = 'pagetitle-component';

const PageTitleComponent = ({ children, isFooter, title }) => {
  const className = isFooter ? `${baseClass} ${baseClass}-is-footer` : baseClass;
  return (
    <div className={className}>
      {children ? <span className="flexible-wrapper-inline">{title}<FlexibleSpacer />{children}</span> : title}
    </div>
  );
};

PageTitleComponent.displayName = 'AlexandriaPageTitleComponent';

PageTitleComponent.propTypes = {
  children: PropTypes.node,
  isFooter: PropTypes.bool.isRequired,
  title: PropTypes.string,
};
PageTitleComponent.defaultProps = {
  isFooter: false,
};

export default PageTitleComponent;
