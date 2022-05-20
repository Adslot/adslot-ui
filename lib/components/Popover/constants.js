"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.themes = exports.popoverStrategies = exports.popoverPlacements = void 0;
var themes = ['light', 'dark', 'warn', 'error', 'info', 'success'];
exports.themes = themes;
var popoverPlacements = ['auto', 'top', 'right', 'bottom', 'left', 'auto-start', 'top-start', 'right-start', 'bottom-start', 'left-start', 'auto-end', 'top-end', 'right-end', 'bottom-end', 'left-end'];
/**
 * Describes the positioning strategy to use.
 * By default, it is absolute.
 * If your reference element is in a fixed container, use the fixed strategy
 */

exports.popoverPlacements = popoverPlacements;
var popoverStrategies = ['absolute', 'fixed'];
exports.popoverStrategies = popoverStrategies;