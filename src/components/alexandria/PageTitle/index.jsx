import React, { PureComponent } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import FlexibleSpacer from 'alexandria/FlexibleSpacer';
import './styles.scss';

const baseClass = 'pagetitle-component';

class PageTitle extends PureComponent {
  render() {
    const { children, isFooter, title } = this.props;

    const className = isFooter ? `${baseClass} ${baseClass}-is-footer` : baseClass;
    return (
      <div className={className} id={_.kebabCase(title)}>
        {children ? <span className="flexible-wrapper-inline">{title}<FlexibleSpacer />{children}</span> : title}
      </div>
    );
  }
}

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
