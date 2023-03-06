import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { expandDts } from '../../utils';
import './styles.css';

const Tile = ({ className, title, imgLink, onClick, dts }) => {
  const baseClass = 'aui--tile';
  const tileClassNames = classNames(baseClass, className);

  return (
    <div className={tileClassNames} onClick={onClick} {...expandDts(dts)}>
      <div className={`${baseClass}-logo`}>{imgLink ? <img src={imgLink} alt="tile-logo" /> : ''}</div>
      <div className={`${baseClass}-title`}>{title}</div>
    </div>
  );
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
  dts: PropTypes.string,
};

export default Tile;
