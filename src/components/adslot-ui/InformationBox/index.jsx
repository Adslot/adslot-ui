import React from 'react';
import PropTypes from 'prop-types';
import SvgSymbol from 'alexandria/SvgSymbol';

require('./styles.scss');

const InformationBox = ({ children, icon, title }) => (
  <div className="information-box">
    <div className="information-box-icon">{icon ? <SvgSymbol classSuffixes={['70']} href={icon} /> : null}</div>
    <div className="information-box-text">
      {title ? <label className="information-box-title">{title}</label> : null}
      <div className="information-box-node">{children}</div>
    </div>
  </div>
);

InformationBox.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  icon: PropTypes.string,
};

export default InformationBox;
