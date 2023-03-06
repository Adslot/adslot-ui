import _ from 'lodash';
import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { expandDts } from '../../utils';
import './styles.css';

const Skeleton = ({ animated, className, dts, height, variant, width }) => {
  const baseClass = 'aui--skeleton';
  const variantClass = () => (_.includes(['rect', 'circle', 'text'], variant) ? `${baseClass}-${variant}` : '');

  return (
    <span
      data-testid="skeleton-wrapper"
      className={classnames(baseClass, variantClass(), { [`${baseClass}-animated`]: animated }, className)}
      style={{
        height: height,
        width: width,
      }}
      {...expandDts(dts)}
    />
  );
};

Skeleton.propTypes = {
  animated: PropTypes.bool,
  /**
   *  Custom classnames
   */
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  /**
   * 	Generate "data-test-selector"
   */
  dts: PropTypes.string,
  height: PropTypes.string,
  /**
   *  oneOf: 'rect', 'circle', 'text'
   */
  variant: PropTypes.oneOf(['rect', 'circle', 'text']),
  width: PropTypes.string,
};

Skeleton.defaultProps = {
  animated: true,
  variant: 'text',
};

export default Skeleton;
