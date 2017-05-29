import React, { PropTypes } from 'react';
import SvgSymbol from 'components/alexandria/SvgSymbol/component';

require('styles/adslotUi/Panel.scss');

const PanelComponent = ({ id, dts, icon, title, isCollapsed, onClick, children }) => {
  const baseClass = 'panel-component';
  const classesCombined = isCollapsed ? [baseClass, 'collapsed'].join(' ') : baseClass;
  const onHeaderClick = () => onClick(id);

  return (
    <div className={classesCombined} data-test-selector={dts}>
      <div className="panel-component-header clearfix" onClick={onHeaderClick}>
        {icon ? <SvgSymbol href={icon.href} /> : null}
        {title}
      </div>
      <div className="panel-component-content">
        {children}
      </div>
    </div>
  );
};

PanelComponent.propTypes = {
  id: PropTypes.string.isRequired,
  dts: PropTypes.string,
  icon: PropTypes.shape(SvgSymbol.propTypes),
  title: PropTypes.node.isRequired,
  isCollapsed: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.any,
};

PanelComponent.defaultProps = {
  isCollapsed: false,
};

export default PanelComponent;
