import React from 'react';
import PropTypes from 'prop-types';
// a generic Icon component is a bad idea because we can't tree-shake the unused icons
// it's probably better to just use them like: impot { ThreeDots } from 'icons'
import * as Icons from '../../../icons/src/react';
import { iconNames } from '../../../icons/src/iconNames';
import colorJSON from '../../../system/tokens/color.json';

const { color } = colorJSON;

const iconColorMap = {
  default: color.grey[800],
  light: color.grey[600],
  primary: color.primary.base,
  success: color.success.base,
  warning: color.warning.base,
  danger: color.danger.base,
  info: color.info.base,
  inverse: color.white,
  currentColor: 'currentColor',
};

const Icon = ({ name, color: colorProp = 'currentColor', size, ...rest }) => {
  if (!Icons[name]) return null;
  const IconComponent = Icons[name];
  const c = iconColorMap[colorProp];
  return <IconComponent size={size} color={c} {...rest} />;
};

Icon.propTypes = {
  name: PropTypes.oneOf(iconNames).isRequired,
  color: PropTypes.oneOf(['default', 'light', 'primary', 'success', 'warning', 'danger', 'info', 'inverse']),
  size: PropTypes.number,
};

export default Icon;
