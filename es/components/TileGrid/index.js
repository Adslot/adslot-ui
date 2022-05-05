import _defineProperty from "@babel/runtime/helpers/defineProperty";

/* eslint-disable jsx-a11y/anchor-is-valid */
import _ from 'lodash';
import classnames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
var defaultWidth = 204; // 204px

var defaultMaxWidth = 295; // 295px

var baseClass = 'tile-grid-component';

var TileGrid = function TileGrid(_ref) {
  var title = _ref.title,
      items = _ref.items,
      onItemClick = _ref.onItemClick,
      distributed = _ref.distributed;

  var cardList = _.map(items, function (item) {
    var itemClassNames = classnames("".concat(baseClass, "-item"), "".concat(baseClass, "-item-").concat(item.classSuffix), _defineProperty({}, "".concat(baseClass, "-item-distributed"), distributed));
    var imgWrapperClassNames = ["".concat(baseClass, "-item-img-wrapper")];

    if (item.imgLink) {
      switch (item.imgAlign || 'left') {
        case 'center':
          imgWrapperClassNames.push("".concat(baseClass, "-item-img-wrapper-center"));
          break;

        case 'right':
          imgWrapperClassNames.push("".concat(baseClass, "-item-img-wrapper-right"));
          break;

        case 'left':
        default:
          imgWrapperClassNames.push("".concat(baseClass, "-item-img-wrapper-left"));
      }
    }

    var itemStyle = distributed ? {
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
      className: "".concat(baseClass, "-item-link"),
      onClick: function onClick() {
        return onItemClick(item.id);
      }
    }, item.title));
  });

  return /*#__PURE__*/React.createElement("div", {
    className: baseClass
  }, title ? /*#__PURE__*/React.createElement("strong", {
    className: "".concat(baseClass, "-title")
  }, title) : null, /*#__PURE__*/React.createElement("ul", {
    className: "".concat(baseClass, "-list")
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