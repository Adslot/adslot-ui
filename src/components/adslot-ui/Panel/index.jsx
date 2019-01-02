import React from 'react';
import PropTypes from 'prop-types';
import SvgSymbol from 'alexandria/SvgSymbol';
import classnames from 'classnames';

require('./styles.scss');

const PanelComponent = ({ id, className, dts, icon, title, isCollapsed, onClick, children }) => {
  const classesCombined = classnames(['panel-component', className, { collapsed: isCollapsed }]);

  const onHeaderClick = () => onClick(id);

  return (
    <div className={classesCombined} data-test-selector={dts}>
      <div className="panel-component-header clearfix" onClick={onHeaderClick}>
        {icon ? <SvgSymbol href={icon.href} /> : null}
        {title}
      </div>
      <div className="panel-component-content">{children}</div>
    </div>
  );
};

PanelComponent.propTypes = {
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
  dts: PropTypes.string,
  icon: PropTypes.shape(SvgSymbol.propTypes),
  title: PropTypes.node.isRequired,
  isCollapsed: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node,
};

PanelComponent.defaultProps = {
  isCollapsed: false,
};

export default PanelComponent;
