import React from 'react';
import { shallow } from 'enzyme';
import Pagination from 'third-party/bootstrap/Pagination';
import PagedGridComponent from 'adslot-ui/PagedGrid';
import GridRow from 'alexandria/Grid/Row';
import GridCell from 'alexandria/Grid/Cell';

describe('PagedGridComponent', () => {
  it('should render with no items', () => {
    const props = {
      columns: [{ key: 'name', label: 'Name' }],
      items: [],
      perPage: 1,
    };
    const component = shallow(<PagedGridComponent {...props} />);
    expect(component.prop('className')).to.equal('pagedgrid-component');

    const gridRowElements = component.find(GridRow);
    expect(gridRowElements).to.have.length(1);

    const gridRowHeader = gridRowElements.first();
    const gridRowHeaderCellElements = gridRowHeader.find(GridCell);
    expect(gridRowHeaderCellElements).to.have.length(1);
    expect(gridRowHeaderCellElements.children().text()).to.equal('Name');

    const paginationElement = component.find(Pagination);
    expect(paginationElement).to.have.length(0);
  });

  it('should render with items', () => {
    const props = {
      columns: [{ key: 'name' }],
      items: [{ name: 'item1', id: 1 }, { name: 'item2', id: 2 }],
      perPage: 1,
    };
    const component = shallow(<PagedGridComponent {...props} />);
    const gridRowElements = component.find(GridRow);
    expect(gridRowElements).to.have.length(2);
    gridRowElements.forEach(gridRowElement => expect(gridRowElement.prop('verticalCellBorder')).to.equal(false));

    const paginationElement = component.find(Pagination);
    expect(paginationElement).to.have.length(1);
  });

  it('should update grid when new page selected or items updated', () => {
    const props = {
      columns: [{ key: 'name' }],
      items: [{ name: 'item1', id: 1 }, { name: 'item2', id: 2 }, { name: 'item3', id: 3 }],
      perPage: 1,
      verticalCellBorder: true,
    };
    const component = shallow(<PagedGridComponent {...props} />);
    const gridRowElements = component.find(GridRow);
    expect(gridRowElements).to.have.length(2);
    gridRowElements.forEach(gridRowElement => expect(gridRowElement.prop('verticalCellBorder')).to.equal(true));

    let paginationInfoElement = component.find('.pagedgrid-component-pagination-info');
    expect(paginationInfoElement.text()).to.equal('1–1 of 3');

    const paginationElement = component.find(Pagination);
    paginationElement.simulate('select', 3);

    paginationInfoElement = component.find('.pagedgrid-component-pagination-info');
    expect(paginationInfoElement.text()).to.equal('3–3 of 3');

    // Update items (no changes)
    component.setProps(props);
    paginationInfoElement = component.find('.pagedgrid-component-pagination-info');
    expect(paginationInfoElement.text()).to.equal('3–3 of 3');

    // Update items (one removed)
    props.items.shift();
    component.setProps(props);
    paginationInfoElement = component.find('.pagedgrid-component-pagination-info');
    expect(paginationInfoElement.text()).to.equal('2–2 of 2');
  });
});
