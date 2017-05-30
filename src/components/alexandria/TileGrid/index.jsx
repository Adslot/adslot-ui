import _ from 'lodash';
import React, { PropTypes } from 'react';
import './styles.scss';

const TileGridComponent = ({ title, items, onItemClick }) => {
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
};

TileGridComponent.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    classSuffix: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  })).isRequired,
  onItemClick: PropTypes.func.isRequired,
};

TileGridComponent.displayName = 'AlexandriaTileGridComponent';

export default TileGridComponent;
