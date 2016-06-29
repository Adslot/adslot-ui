import React, { PropTypes } from 'react';
import { SvgSymbol } from 'alexandria-adslot';

require('styles/adslotUi/Panel.scss');

const PanelComponent = ({ id, dts, icon, title, isCollapsed, onClick, children }) => {
  const baseClass = 'panel-component';
  const classesCombined = isCollapsed ? [baseClass, 'collapsed'].join(' ') : baseClass;
  const onHeaderClick = () => onClick(id);

  return (
    <div className={classesCombined}>
      <div className="panel-component-header" onClick={onHeaderClick} data-test-selector={dts}>
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
  title: PropTypes.string.isRequired,
  isCollapsed: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.any,
};

PanelComponent.defaultProps = {
  isCollapsed: false,
};

export default PanelComponent;
