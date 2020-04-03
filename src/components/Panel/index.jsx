import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import './styles.scss';

class PanelComponent extends React.PureComponent {
  static propTypes = {
    id: PropTypes.string.isRequired,
    className: PropTypes.string,
    dts: PropTypes.string,
    icon: PropTypes.node,
    title: PropTypes.node.isRequired,
    isCollapsed: PropTypes.bool,
    onClick: PropTypes.func,
    children: PropTypes.node,
  };

  onHeaderClick = () => this.props.onClick(this.props.id);

  render() {
    const { className, children, dts, icon, isCollapsed, title } = this.props;
    const classesCombined = classnames(['panel-component', className, { collapsed: isCollapsed }]);

    return (
      <div className={classesCombined} data-test-selector={dts}>
        <div className="panel-component-header clearfix" onClick={this.onHeaderClick}>
          {icon}
          {title}
        </div>
        <div className="panel-component-content">{children}</div>
      </div>
    );
  }
}

export default PanelComponent;
