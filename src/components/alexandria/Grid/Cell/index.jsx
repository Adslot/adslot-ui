import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { expandDts, classSuffixHelper } from 'lib/utils';
import './styles.scss';

class GridCell extends PureComponent {
  render() {
    const { children, classSuffixes, onClick, stretch, dts } = this.props;

    const componentClass = 'grid-component-cell';
    const classesList = classSuffixHelper({
      classSuffixes,
      suffixOptions: {
        stretch,
        clickable: onClick,
      },
      componentClass,
    });
    const extraProps = onClick ? { onClick } : {};

    return (
      <div className={`${componentClass}${classesList}`} {...extraProps} {...expandDts(dts)}>
        {children}
      </div>
    );
  }
}

GridCell.displayName = 'AlexandriaGridCellComponent';

GridCell.propTypes = {
  children: PropTypes.node,
  classSuffixes: PropTypes.arrayOf(PropTypes.string).isRequired,
  onClick: PropTypes.func,
  stretch: PropTypes.bool.isRequired,
  dts: PropTypes.string,
};

GridCell.defaultProps = {
  classSuffixes: [],
  stretch: false,
};

export default GridCell;
