import { shallow } from 'enzyme';
import GridCellComponent from 'components/alexandria/GridCellComponent';
import GridComponent from 'components/alexandria/GridComponent';
import GridRowComponent from 'components/alexandria/GridRowComponent';
import React from 'react';
import TotalsComponent from 'components/alexandria/TotalsComponent';

describe('TotalsComponent', () => {
  it('should render with defaults', () => {
    const component = shallow(<TotalsComponent />);
    expect(component.type()).to.equal(GridComponent);
    expect(component.children()).to.have.length(1);

    const totalRow = component.children().first();
    expect(totalRow.type()).to.equal(GridRowComponent);
    expect(totalRow.prop('short')).to.equal(true);
    expect(totalRow.prop('horizontalBorder')).to.equal(false);
    expect(totalRow.prop('type')).to.equal('footer');

    const totalLabelEl = totalRow.find(GridCellComponent).first();
    expect(totalLabelEl.prop('stretch')).to.equal(true);
    expect(totalLabelEl.children().text()).to.equal('Total');

    const totalValueEl = totalRow.find(GridCellComponent).last();
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
      valueFormatter: (value) => `€${(value / 100).toFixed(2)}`,
    };
    const component = shallow(<TotalsComponent {...props} />);

    expect(component.type()).to.equal(GridComponent);
    const rows = component.find(GridRowComponent);

    const firstRow = rows.at(0);
    expect(firstRow.prop('short')).to.equal(true);
    expect(firstRow.prop('horizontalBorder')).to.equal(false);

    let labelEl = firstRow.find(GridCellComponent).first();
    expect(labelEl.prop('stretch')).to.equal(true);
    expect(labelEl.children().text()).to.equal('Custom Paint for Yo Whip');

    let valueEl = firstRow.find(GridCellComponent).last();
    expect(valueEl.children().text()).to.equal('€2000.00');

    const secondRow = rows.at(1);
    expect(secondRow.prop('short')).to.equal(true);
    expect(secondRow.prop('horizontalBorder')).to.equal(false);

    labelEl = secondRow.find(GridCellComponent).first();
    expect(labelEl.prop('stretch')).to.equal(true);
    expect(labelEl.children().text()).to.equal('Selected');

    valueEl = secondRow.find(GridCellComponent).last();
    expect(valueEl.children().text()).to.equal('€500.00');

    const totalRow = rows.at(2);
    expect(totalRow.prop('short')).to.equal(true);
    expect(totalRow.prop('horizontalBorder')).to.equal(false);
    expect(totalRow.prop('type')).to.equal('footer');

    labelEl = totalRow.find(GridCellComponent).first();
    expect(labelEl.prop('stretch')).to.equal(true);
    expect(labelEl.children().text()).to.equal('Total');

    valueEl = totalRow.find(GridCellComponent).last();
    expect(valueEl.children().text()).to.equal('€2501.00');
  });
});
