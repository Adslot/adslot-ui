import classnames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const InformationBox = ({ children, icon, title, className, dts }) => (
  <div className={classnames('information-box', className)} data-test-selector={dts}>
    {icon ? <div className="information-box-icon"> {icon}</div> : null}
    <div className="information-box-text">
      {title ? <label className="information-box-title">{title}</label> : null}
      <div className="information-box-node">{children}</div>
    </div>
  </div>
);

InformationBox.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  title: PropTypes.node,
  icon: PropTypes.node,
  dts: PropTypes.string,
};

export default InformationBox;
