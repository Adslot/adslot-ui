import { QUARTER, HALF, ROUND, getPointX, getPointY } from 'components/alexandria/slicey/dataProcessor';

describe('DataProcessor', () => {
  it('should export constants', () => {
    expect(QUARTER).to.equal(Math.PI / 2);
    expect(HALF).to.equal(Math.PI);
    expect(ROUND).to.equal(Math.PI * 2);
  });

  it('should export point methods', () => {
    expect(getPointX(Math.PI)).to.equal(-0.5);
    expect(getPointY(Math.PI / 2)).to.equal(0.5);
  });
});
