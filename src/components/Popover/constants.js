import _ from 'lodash';

export const themes = ['light', 'dark', 'warn', 'error', 'info', 'success'];

const basePlacements = ['auto', 'top', 'right', 'bottom', 'left'];
export const popoverPlacements = _.flatMap(basePlacements, trigger => [trigger, `${trigger}-start`, `${trigger}-end`]);
