import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { expandDts } from '../../lib/utils';

var Tile = function Tile(_ref) {
  var className = _ref.className,
      title = _ref.title,
      imgLink = _ref.imgLink,
      onClick = _ref.onClick,
      dts = _ref.dts;
  var baseClass = 'aui--tile';
  var tileClassNames = classNames(baseClass, className);
  return /*#__PURE__*/React.createElement("div", Object.assign({
    className: tileClassNames,
    onClick: onClick
  }, expandDts(dts)), /*#__PURE__*/React.createElement("div", {
    className: "".concat(baseClass, "-logo")
  }, imgLink ? /*#__PURE__*/React.createElement("img", {
    src: imgLink,
    alt: "tile-logo"
  }) : ''), /*#__PURE__*/React.createElement("div", {
    className: "".concat(baseClass, "-title")
  }, title));
};

Tile.propTypes = {
  /**
   *  	Custom classnames
   */
  className: PropTypes.string,

  /**
   * 	Tile title
   */
  title: PropTypes.node,

  /**
   * 	Use Logo as a tile
   */
  imgLink: PropTypes.string,

  /**
   *  Custome onClick event
   */
  onClick: PropTypes.func,

  /**
   * 	Generate "data-test-selector" on the pill
   */
  dts: PropTypes.string
};
export default Tile;