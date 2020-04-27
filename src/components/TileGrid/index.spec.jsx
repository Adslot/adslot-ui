/* eslint-disable lodash/prefer-lodash-method */
import _ from 'lodash';
import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import TileGrid from '.';

describe('TileGrid', () => {
  const props = {
    items: [{ id: '0', classSuffix: 'alpha', title: 'Alpha' }, { id: '1', classSuffix: 'beta', title: 'Beta' }],
    onItemClick: _.noop,
  };

  it('renders with basic props', () => {
    const component = shallow(<TileGrid {...props} items={[]} />);
    expect(component.prop('className')).to.equal('tile-grid-component');

    const title = component.find('.tile-grid-component-title');
    expect(title).to.have.length(0);

    const list = component.find('.tile-grid-component-list');
    expect(list).to.have.length(1);
    expect(list.children()).to.have.length(0);
  });

  it('renders title if props contain it', () => {
    const newProps = _.assign(props, { title: 'Lorem ipsum' });
    const component = shallow(<TileGrid {...newProps} items={[]} />);

    const title = component.find('.tile-grid-component-title');
    expect(title).to.have.length(1);
    expect(title.text()).to.equal('Lorem ipsum');
  });

  it('renders with items', () => {
    const component = shallow(<TileGrid {...props} />);
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
    const component = shallow(<TileGrid {...props} onItemClick={onItemClickSpy} />);
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

  it('should handle evenly distributed', () => {
    props.distributed = true;
    const component = shallow(<TileGrid {...props} />);
    const tileList = component.find('.tile-grid-component-item-distributed');
    expect(tileList).to.have.length(2);
  });

  it('should add image for background if imgLink is provided', () => {
    const itemsWithLink = [
      { id: '0', classSuffix: 'alpha', title: 'Alpha', imgLink: '/linkAlpha.jpg' },
      { id: '1', classSuffix: 'beta', title: 'Beta', imgLink: '/linkBeta.jpg' },
    ];
    props.items = itemsWithLink;
    const component = shallow(<TileGrid {...props} />);
    const tileList = component.find('.tile-grid-component-item-img-wrapper');
    expect(tileList).to.have.length(2);
  });

  it('should handle image position', () => {
    const itemsWithLinkAndPosition = [
      { id: '0', classSuffix: 'one', title: 'One', imgLink: '/linkOne.jpg', imgAlign: 'left' },
      { id: '1', classSuffix: 'two', title: 'Two', imgLink: '/linkTwo.jpg', imgAlign: 'center' },
      { id: '1', classSuffix: 'three', title: 'Three', imgLink: '/linkThree.jpg', imgAlign: 'right' },
    ];
    props.items = itemsWithLinkAndPosition;
    const component = shallow(<TileGrid {...props} />);
    const tileList = component.find('.tile-grid-component-item-img-wrapper');
    expect(tileList).to.have.length(3);
    const leftAlignedTile = component.find('.tile-grid-component-item-img-wrapper-left');
    expect(leftAlignedTile).to.have.length(1);
    const centerAlignedTile = component.find('.tile-grid-component-item-img-wrapper-center');
    expect(centerAlignedTile).to.have.length(1);
    const rightAlignedTile = component.find('.tile-grid-component-item-img-wrapper-right');
    expect(rightAlignedTile).to.have.length(1);
  });
});
