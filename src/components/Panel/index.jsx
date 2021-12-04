import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { useCollapse } from '../../hooks/useCollapse';
import './styles.css';

const Panel = ({ onClick, className, children, dts, icon, id, isCollapsed, title, animate = true }) => {
  const onHeaderClick = () => {
    onClick(id);
  };

  const { collapsed, height, containerRef } = useCollapse({
    collapsed: isCollapsed,
  });

  const classesCombined = classnames(['panel-component', { collapsed }, className]);

  return (
    <div data-testid="panel-wrapper" className={classesCombined} data-test-selector={dts}>
      <div data-testid="panel-header" className="panel-component-header clearfix" onClick={onHeaderClick}>
        {icon}
        {title}
      </div>
      <div style={{ height }} className={classnames('panel-component-content-wrapper', { animate })}>
        <div ref={containerRef} data-testid="panel-content" className="panel-component-content">
          {children}
        </div>
      </div>
    </div>
  );
};

Panel.propTypes = {
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
  dts: PropTypes.string,
  icon: PropTypes.node,
  title: PropTypes.node.isRequired,
  isCollapsed: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.node,
  animate: PropTypes.bool,
};

export default Panel;
