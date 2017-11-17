/* eslint-disable jsx-a11y/anchor-is-valid */
import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import idPropType from '../../prop-types/idPropType';
import './styles.scss';

const TileGrid = ({ title, items, onItemClick }) => {
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

TileGrid.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({
    id: idPropType.isRequired,
    classSuffix: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  })).isRequired,
  onItemClick: PropTypes.func.isRequired,
};

TileGrid.displayName = 'AlexandriaTileGridComponent';

export default TileGrid;
