import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { expandDts } from '../../lib/utils';

const Tile = _ref => {
  let {
    className,
    title,
    imgLink,
    onClick,
    dts
  } = _ref;
  const baseClass = 'aui--tile';
  const tileClassNames = classNames(baseClass, className);
  return /*#__PURE__*/React.createElement("div", Object.assign({
    className: tileClassNames,
    onClick: onClick
  }, expandDts(dts)), /*#__PURE__*/React.createElement("div", {
    className: `${baseClass}-logo`
  }, imgLink ? /*#__PURE__*/React.createElement("img", {
    src: imgLink,
    alt: "tile-logo"
  }) : ''), /*#__PURE__*/React.createElement("div", {
    className: `${baseClass}-title`
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