/* eslint-disable jsx-a11y/anchor-is-valid */
import _ from 'lodash';
import classnames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const defaultWidth = 204; // 204px
const defaultMaxWidth = 295; // 295px
const baseClass = 'tile-grid-component';

const TileGrid = ({ title, items, onItemClick, distributed }) => {
  const cardList = _.map(items, item => {
    const itemClassNames = classnames(`${baseClass}-item`, `${baseClass}-item-${item.classSuffix}`, {
      [`${baseClass}-item-distributed`]: distributed,
    });

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
      <li data-testid="tile-grid-list-item" key={item.id} className={itemClassNames} style={itemStyle}>
        {item.imgLink ? (
          <div data-testid="tile-grid-list-item-img-wrapper" className={imgWrapperClassNames.join(' ')}>
            <img src={item.imgLink} alt="item-link" />
          </div>
        ) : null}
        <a
          data-testid="tile-grid-list-item-link"
          className={`${baseClass}-item-link`}
          onClick={() => onItemClick(item.id)}
        >
          {item.title}
        </a>
      </li>
    );
  });

  return (
    <div data-testid="tile-grid-wrapper" className={baseClass}>
      {title ? (
        <strong data-testid="tile-grid-title" className={`${baseClass}-title`}>
          {title}
        </strong>
      ) : null}
      <ul data-testid="tile-grid-list" className={`${baseClass}-list`}>
        {cardList}
      </ul>
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
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
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

export default TileGrid;
