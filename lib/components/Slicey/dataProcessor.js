"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPointY = exports.getPointX = exports.ROUND = exports.QUARTER = exports.HALF = void 0;
const RADIUS = 0.5;
const QUARTER = exports.QUARTER = Math.PI / 2;
const HALF = exports.HALF = Math.PI;
const ROUND = exports.ROUND = Math.PI * 2;
const getPointX = angle => RADIUS * Math.cos(angle);
exports.getPointX = getPointX;
const getPointY = angle => RADIUS * Math.sin(angle);
exports.getPointY = getPointY;