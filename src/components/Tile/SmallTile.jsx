import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import idPropType from '../../prop-types/idPropType';
import './styles.scss';

const SmallTile = ({ item }) => {
  const { id, classSuffix, title, logo, onClick } = item;
  const baseClass = 'aui--small-tile';
  const tileClassNames = classNames(baseClass, { [`${baseClass}-${classSuffix}`]: classSuffix });

  return (
    <div key={id} className={tileClassNames} onClick={onClick ? () => onClick(id) : () => {}}>
      <div className={`${baseClass}-logo`}>{logo ? <img src={logo} alt={`logo-${id}`} /> : null}</div>
      <div className={`${baseClass}-title`}>{title}</div>
    </div>
  );
};

SmallTile.propTypes = {
  item: PropTypes.shape({
    id: idPropType.isRequired,
    classSuffix: PropTypes.string,
    title: PropTypes.node,
    logo: PropTypes.string,
    onClick: PropTypes.func,
  }).isRequired,
};

SmallTile.displayName = 'SmallTileComponent';

export default SmallTile;
