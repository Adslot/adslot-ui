import { QUARTER, HALF, ROUND, getPointX, getPointY } from './dataProcessor';

describe('DataProcessor', () => {
  it('should export constants', () => {
    expect(QUARTER).toEqual(Math.PI / 2);
    expect(HALF).toEqual(Math.PI);
    expect(ROUND).toEqual(Math.PI * 2);
  });

  it('should export point methods', () => {
    expect(getPointX(Math.PI)).toEqual(-0.5);
    expect(getPointY(Math.PI / 2)).toEqual(0.5);
  });
});
