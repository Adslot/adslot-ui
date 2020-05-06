/* eslint-disable jsx-a11y/anchor-is-valid */
import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import idPropType from '../../prop-types/idPropType';
import './styles.scss';

const defaultWidth = 204; // 204px
const defaultMaxWidth = 295; // 295px
const baseClass = 'tile-grid-component';

const TileGrid = ({ title, items, onItemClick, distributed }) => {
  const cardList = _.map(items, item => {
    const itemClassNames = [`${baseClass}-item`, `${baseClass}-item-${item.classSuffix}`];
    if (distributed) itemClassNames.push(`${baseClass}-item-distributed`);

    const imgWrapperClassNames = [`${baseClass}-item-img-wrapper`];

    if (item.imgLink) {
      switch (item.imgAlign || 'left') {
        case 'center':
          imgWrapperClassNames.push(`${baseClass}-item-img-wrapper-center`);
          break;
        case 'right':
          imgWrapperClassNames.push(`${baseClass}-item-img-wrapper-right`);
          break;
        case 'left':
        default:
          imgWrapperClassNames.push(`${baseClass}-item-img-wrapper-left`);
      }
    }

    const itemStyle = distributed
      ? { maxWidth: item.maxWidth || defaultMaxWidth }
      : { width: item.width || defaultWidth };

    return (
      <li key={item.id} className={itemClassNames.join(' ')} style={itemStyle}>
        {item.imgLink ? (
          <div className={imgWrapperClassNames.join(' ')}>
            <img src={item.imgLink} alt="item-link" />
          </div>
        ) : null}
        <a className={`${baseClass}-item-link`} onClick={() => onItemClick(item.id)}>
          {item.title}
        </a>
      </li>
    );
  });

  return (
    <div className={baseClass}>
      {title ? <strong className={`${baseClass}-title`}>{title}</strong> : null}
      <ul className={`${baseClass}-list`}>{cardList}</ul>
    </div>
  );
};

TileGrid.defaultProps = {
  distributed: false,
};

TileGrid.propTypes = {
  title: PropTypes.node,
  /**
   * 	The shape of item object is defined below
   */
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: idPropType.isRequired,
      classSuffix: PropTypes.string.isRequired,
      title: PropTypes.node.isRequired,
      imgLink: PropTypes.string,
      width: PropTypes.number,
      maxWidth: PropTypes.number,
      imgAlign: PropTypes.oneOf(['left', 'right', 'center']),
    })
  ).isRequired,
  onItemClick: PropTypes.func.isRequired,
  /**
   * 	If distributed is true, each tile in this component will have a distributed width.
   */
  distributed: PropTypes.bool,
};

TileGrid.displayName = 'TileGridComponent';

export default TileGrid;
