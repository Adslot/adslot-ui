"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPointY = exports.getPointX = exports.ROUND = exports.QUARTER = exports.HALF = void 0;
var RADIUS = 0.5;
var QUARTER = Math.PI / 2;
exports.QUARTER = QUARTER;
var HALF = Math.PI;
exports.HALF = HALF;
var ROUND = Math.PI * 2;
exports.ROUND = ROUND;

var getPointX = function getPointX(angle) {
  return RADIUS * Math.cos(angle);
};

exports.getPointX = getPointX;

var getPointY = function getPointY(angle) {
  return RADIUS * Math.sin(angle);
};

exports.getPointY = getPointY;