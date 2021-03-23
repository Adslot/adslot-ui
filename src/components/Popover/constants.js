import _ from 'lodash';

export const themes = ['light', 'dark', 'warn', 'error', 'info', 'success'];

const basePlacements = ['auto', 'top', 'right', 'bottom', 'left'];
export const popoverPlacements = _.flatMap(basePlacements, trigger => [trigger, `${trigger}-start`, `${trigger}-end`]);

/**
 * Describes the positioning strategy to use.
 * By default, it is absolute.
 * If your reference element is in a fixed container, use the fixed strategy
 */
export const popoverStrategies = ['absolute', 'fixed'];
