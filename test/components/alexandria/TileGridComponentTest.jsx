import _ from 'lodash';
import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import TileGridComponent from 'components/alexandria/TileGridComponent';

describe('TileGridComponent', () => {
  const props = {
    title: 'Lorem ipsum',
    items: [
      { id: '0', classSuffix: 'alpha', title: 'Alpha' },
      { id: '1', classSuffix: 'beta', title: 'Beta' },
    ],
    onItemClick: _.noop,
  };

  it('renders with basic props', () => {
    const component = shallow(<TileGridComponent {...props} items={[]} />);
    expect(component.prop('className')).to.equal('tile-grid-component');

    const title = component.find('.tile-grid-component-title');
    expect(title).to.have.length(1);
    expect(title.text()).to.equal('Lorem ipsum');

    const list = component.find('.tile-grid-component-list');
    expect(list).to.have.length(1);
    expect(list.children()).to.have.length(0);
  });

  it('renders with items', () => {
    const component = shallow(<TileGridComponent {...props} />);
    const list = component.find('.tile-grid-component-list');
    expect(list.children()).to.have.length(2);

    const firstTileItem = list.childAt(0);
    expect(firstTileItem.prop('className')).to.equal('tile-grid-component-item tile-grid-component-item-alpha');

    const firstTileLink = firstTileItem.find('.tile-grid-component-item-link');
    expect(firstTileLink).to.have.length(1);
    expect(firstTileLink.prop('onClick')).to.be.a('function');
    expect(firstTileLink.text()).to.equal('Alpha');

    const secondTileItem = list.childAt(1);
    expect(secondTileItem.prop('className')).to.equal('tile-grid-component-item tile-grid-component-item-beta');

    const secondTileLink = secondTileItem.find('.tile-grid-component-item-link');
    expect(secondTileLink).to.have.length(1);
    expect(secondTileLink.prop('onClick')).to.be.a('function');
    expect(secondTileLink.text()).to.equal('Beta');
  });

  it('handles tile clicks', () => {
    const onItemClickSpy = sinon.spy();
    const component = shallow(<TileGridComponent {...props} onItemClick={onItemClickSpy} />);
    const tileLinks = component.find('.tile-grid-component-item-link');
    const firstTileLink = tileLinks.at(0);
    firstTileLink.simulate('click');
    expect(onItemClickSpy.callCount).to.equal(1);
    expect(onItemClickSpy.calledWith('0')).to.equal(true);

    const secondTileLink = tileLinks.at(1);
    secondTileLink.simulate('click');
    expect(onItemClickSpy.callCount).to.equal(2);
    expect(onItemClickSpy.calledWith('1')).to.equal(true);
  });
});
