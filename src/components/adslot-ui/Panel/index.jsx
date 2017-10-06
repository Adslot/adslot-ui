import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import SvgSymbol from 'alexandria/SvgSymbol';

require('./styles.scss');

class PanelComponent extends PureComponent {
  onHeaderClick = () => this.props.onClick(this.props.id);

  render() {
    const { dts, icon, title, isCollapsed, children } = this.props;

    const baseClass = 'panel-component';
    const classesCombined = isCollapsed ? [baseClass, 'collapsed'].join(' ') : baseClass;

    return (
      <div className={classesCombined} data-test-selector={dts}>
        <div className="panel-component-header clearfix" onClick={this.onHeaderClick}>
          {icon ? <SvgSymbol href={icon.href} /> : null}
          {title}
        </div>
        <div className="panel-component-content">
          {children}
        </div>
      </div>
    );
  }
}

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
