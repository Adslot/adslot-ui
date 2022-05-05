var RADIUS = 0.5;
export var QUARTER = Math.PI / 2;
export var HALF = Math.PI;
export var ROUND = Math.PI * 2;
export var getPointX = function getPointX(angle) {
  return RADIUS * Math.cos(angle);
};
export var getPointY = function getPointY(angle) {
  return RADIUS * Math.sin(angle);
};