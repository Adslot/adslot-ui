/* eslint-disable lodash/prefer-lodash-method */
import React from 'react';
import { shallow } from 'enzyme';
import GridCell from 'alexandria/Grid/Cell';
import Grid from 'alexandria/Grid';
import GridRow from 'alexandria/Grid/Row';
import Totals from '.';

describe('Totals', () => {
  it('should render with defaults', () => {
    const component = shallow(<Totals />);
    expect(component.type()).to.equal(Grid);
    expect(component.children()).to.have.length(1);

    const totalRow = component.children().first();
    expect(totalRow.type()).to.equal(GridRow);
    expect(totalRow.prop('short')).to.equal(true);
    expect(totalRow.prop('horizontalBorder')).to.equal(false);
    expect(totalRow.prop('type')).to.equal('footer');

    const totalLabelEl = totalRow.find(GridCell).first();
    expect(totalLabelEl.prop('stretch')).to.equal(true);
    expect(totalLabelEl.children().text()).to.equal('Total');

    const totalValueEl = totalRow.find(GridCell).last();
    expect(totalValueEl.prop('stretch')).to.equal(false);
    expect(totalValueEl.children().text()).to.equal('0');
  });

  it('should render with props', () => {
    const props = {
      toSum: [
        { value: 100, isHidden: true },
        { label: 'Custom Paint for Yo Whip', value: 200000 },
        { label: 'Selected', value: 50000 },
      ],
      valueFormatter: value => `€${(value / 100).toFixed(2)}`,
    };
    const component = shallow(<Totals {...props} />);

    expect(component.type()).to.equal(Grid);
    const rows = component.find(GridRow);

    const firstRow = rows.at(0);
    expect(firstRow.prop('short')).to.equal(true);
    expect(firstRow.prop('horizontalBorder')).to.equal(false);

    let labelEl = firstRow.find(GridCell).first();
    expect(labelEl.prop('stretch')).to.equal(true);
    expect(labelEl.children().text()).to.equal('Custom Paint for Yo Whip');

    let valueEl = firstRow.find(GridCell).last();
    expect(valueEl.children().text()).to.equal('€2000.00');

    const secondRow = rows.at(1);
    expect(secondRow.prop('short')).to.equal(true);
    expect(secondRow.prop('horizontalBorder')).to.equal(false);

    labelEl = secondRow.find(GridCell).first();
    expect(labelEl.prop('stretch')).to.equal(true);
    expect(labelEl.children().text()).to.equal('Selected');

    valueEl = secondRow.find(GridCell).last();
    expect(valueEl.children().text()).to.equal('€500.00');

    const totalRow = rows.at(2);
    expect(totalRow.prop('short')).to.equal(true);
    expect(totalRow.prop('horizontalBorder')).to.equal(false);
    expect(totalRow.prop('type')).to.equal('footer');

    labelEl = totalRow.find(GridCell).first();
    expect(labelEl.prop('stretch')).to.equal(true);
    expect(labelEl.children().text()).to.equal('Total');

    valueEl = totalRow.find(GridCell).last();
    expect(valueEl.children().text()).to.equal('€2501.00');
  });
});
