import React from 'react';
import PropTypes from 'prop-types';
import SvgSymbol from 'components/SvgSymbol';

require('./styles.scss');

const InformationBox = ({ children, icon, title, className }) => (
  <div className={`information-box${className ? ` ${className}` : ''}`}>
    {icon ? (
      <div className="information-box-icon">
        {' '}
        <SvgSymbol classSuffixes={['70']} href={icon} />
      </div>
    ) : null}
    <div className="information-box-text">
      {title ? <label className="information-box-title">{title}</label> : null}
      <div className="information-box-node">{children}</div>
    </div>
  </div>
);

InformationBox.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  title: PropTypes.string,
  icon: PropTypes.string,
};

export default InformationBox;
