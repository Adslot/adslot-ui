import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { expandDts } from '../../lib/utils';
import idPropType from '../../prop-types/idPropType';
import './styles.scss';

const Pill = ({ id, classSuffix, children, onClick, dts }) => (
  <div
    className={classnames(
      'aui--pill',
      { [`aui--pill-${classSuffix}`]: classSuffix },
      { 'aui--pill-clickable': onClick }
    )}
    onClick={onClick ? () => onClick(id) : () => {}}
    {...expandDts(dts)}
  >
    <div className="aui--pill-children">{children}</div>
  </div>
);

Pill.propTypes = {
  id: idPropType,
  /**
   * 	Text inside pill
   */
  children: PropTypes.node.isRequired,
  /**
   *  	Custom classname suffix
   */
  classSuffix: PropTypes.string,
  /**
   * 	Generate "data-test-selector" on the pill
   */
  dts: PropTypes.string,
  onClick: PropTypes.func,
};

export default Pill;
