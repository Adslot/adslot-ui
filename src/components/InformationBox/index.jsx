import classnames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const styles = ['primary', 'success', 'warning', 'error', 'light'];

const InformationBox = ({ children, icon, title, className, theme, dts }) => (
  <div
    className={classnames('aui--information-box', `aui--information-box-${theme}`, className)}
    data-test-selector={dts}
  >
    {icon ? <div className="aui--information-box-icon"> {icon}</div> : null}
    <div className="aui--information-box-text">
      {title ? <label className="aui--information-box-title">{title}</label> : null}
      <div className="aui--information-box-node">{children}</div>
    </div>
  </div>
);

InformationBox.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  theme: PropTypes.oneOf(styles),
  title: PropTypes.node,
  icon: PropTypes.node,
  dts: PropTypes.string,
};

InformationBox.defaultProps = {
  theme: 'light',
};

export default InformationBox;
