import _ from 'lodash';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

class TileGrid extends PureComponent {
  render() {
    const { title, items, onItemClick } = this.props;

    const baseClass = 'tile-grid-component';

    return (
      <div className={baseClass}>
        <strong className={`${baseClass}-title`}>{title}</strong>
        <ul className={`${baseClass}-list`}>
          {_.map(items, (item) => (
            <li key={item.id} className={`${baseClass}-item ${baseClass}-item-${item.classSuffix}`}>
              <a className={`${baseClass}-item-link`} onClick={() => onItemClick(item.id)}>{item.title}</a>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

TileGrid.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    classSuffix: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  })).isRequired,
  onItemClick: PropTypes.func.isRequired,
};

TileGrid.displayName = 'AlexandriaTileGridComponent';

export default TileGrid;
