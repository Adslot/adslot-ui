/* eslint-disable jsx-a11y/anchor-is-valid */
import _ from 'lodash';
import classnames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
const defaultWidth = 204; // 204px
const defaultMaxWidth = 295; // 295px
const baseClass = 'tile-grid-component';
const TileGrid = _ref => {
  let {
    title,
    items,
    onItemClick,
    distributed
  } = _ref;
  const cardList = _.map(items, item => {
    const itemClassNames = classnames(`${baseClass}-item`, `${baseClass}-item-${item.classSuffix}`, {
      [`${baseClass}-item-distributed`]: distributed
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
    const itemStyle = distributed ? {
      maxWidth: item.maxWidth || defaultMaxWidth
    } : {
      width: item.width || defaultWidth
    };
    return /*#__PURE__*/React.createElement("li", {
      key: item.id,
      className: itemClassNames,
      style: itemStyle
    }, item.imgLink ? /*#__PURE__*/React.createElement("div", {
      className: imgWrapperClassNames.join(' ')
    }, /*#__PURE__*/React.createElement("img", {
      src: item.imgLink,
      alt: "item-link"
    })) : null, /*#__PURE__*/React.createElement("a", {
      className: `${baseClass}-item-link`,
      onClick: () => onItemClick(item.id)
    }, item.title));
  });
  return /*#__PURE__*/React.createElement("div", {
    className: baseClass
  }, title ? /*#__PURE__*/React.createElement("strong", {
    className: `${baseClass}-title`
  }, title) : null, /*#__PURE__*/React.createElement("ul", {
    className: `${baseClass}-list`
  }, cardList));
};
TileGrid.defaultProps = {
  distributed: false
};
TileGrid.propTypes = {
  title: PropTypes.node,
  /**
   * 	The shape of item object is defined below
   */
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    classSuffix: PropTypes.string.isRequired,
    title: PropTypes.node.isRequired,
    imgLink: PropTypes.string,
    width: PropTypes.number,
    maxWidth: PropTypes.number,
    imgAlign: PropTypes.oneOf(['left', 'right', 'center'])
  })).isRequired,
  onItemClick: PropTypes.func.isRequired,
  /**
   * 	If distributed is true, each tile in this component will have a distributed width.
   */
  distributed: PropTypes.bool
};
export default TileGrid;