const RADIUS = 0.5;

export const QUARTER = Math.PI / 2;
export const HALF = Math.PI;
export const ROUND = Math.PI * 2;

export const getPointX = (angle) => RADIUS * Math.cos(angle);

export const getPointY = (angle) => RADIUS * Math.sin(angle);
