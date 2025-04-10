"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const isProduction = process.env.NODE_ENV === 'production';
const prefix = 'AdslotUI';
const invariant = (condition, message) => {
  if (!isProduction && !condition) {
    throw new Error(`${prefix} ${message}`);
  }
};
var _default = exports.default = invariant;