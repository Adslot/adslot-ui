import _ from 'lodash';
import React from 'react';
import sinon from 'sinon';
import { mount, shallow } from 'enzyme';
import { Pill } from 'adslot-ui';
import SmallTile from './SmallTile';
import Tile, { TileTemplate } from '.';

const makeItemProps = override =>
  _.merge(
    {
      id: '123',
    },
    override
  );

describe('<SmallTile />', () => {
  let sandbox;

  before(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => sandbox.restore());

  it('should have default style', () => {
    const wrapper = mount(<SmallTile item={makeItemProps()} />);
    expect(wrapper.find('.aui--small-tile')).to.have.length(1);
    expect(wrapper.find('.aui--small-tile-title')).to.have.length(1);
    expect(wrapper.find('.aui--small-tile-title').text()).to.equal('');
    expect(wrapper.find('.aui--small-tile-logo')).to.have.length(1);
    expect(wrapper.find('.aui--small-tile-logo').children()).to.have.length(0);
  });

  it('should allow title prop', () => {
    const wrapper = shallow(<SmallTile item={makeItemProps({ title: 'test-title' })} />);
    expect(wrapper.find('.aui--small-tile-title')).to.have.length(1);
    expect(wrapper.find('.aui--small-tile-title').text()).to.equal('test-title');
  });

  it('should allow id prop', () => {
    const wrapper = mount(<SmallTile item={makeItemProps()} />);
    expect(wrapper.props().item.id).to.equal('123');
  });

  it('should allow logo prop', () => {
    const wrapper = shallow(<SmallTile item={makeItemProps({ logo: 'fake-url' })} />);
    expect(wrapper.find('.aui--small-tile-logo')).to.have.length(1);
    expect(wrapper.find('.aui--small-tile-logo').children()).to.have.length(1);
  });

  it('should allow classSuffix prop', () => {
    const wrapper = shallow(<SmallTile item={makeItemProps({ classSuffix: 'test' })} />);
    expect(wrapper.find('.aui--small-tile.aui--small-tile-test')).to.have.length(1);
  });

  it('should allow onClick prop', () => {
    const onClickMock = sinon.spy();
    const wrapper = shallow(<SmallTile item={makeItemProps({ onClick: onClickMock })} />);
    wrapper.simulate('click');
    expect(onClickMock.callCount).to.equal(1);
  });

  it('should not cause console error if onClick is undefined', () => {
    sandbox.stub(console, 'error');
    const wrapper = shallow(<SmallTile item={makeItemProps({})} />);
    wrapper.simulate('click');
    expect(console.error.callCount).to.equal(0);
  });
});

describe('<TileTemplate />', () => {
  let sandbox;

  before(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => sandbox.restore());

  it('should render different tiles with different types', () => {
    const wrapperForStandard = shallow(<TileTemplate type="standard" item={makeItemProps()} />);
    expect(wrapperForStandard.find('.aui--standard-tile')).to.have.length(1);
    expect(wrapperForStandard.find('.aui--large-tile')).to.have.length(0);

    const wrapperForLarge = shallow(<TileTemplate type="large" item={makeItemProps()} />);
    expect(wrapperForLarge.find('.aui--standard-tile')).to.have.length(0);
    expect(wrapperForLarge.find('.aui--large-tile')).to.have.length(1);
  });

  it('should render default component without error', () => {
    const wrapper = mount(<TileTemplate type="standard" item={makeItemProps()} />);

    expect(wrapper.find('.card-component.aui--standard-tile')).to.have.length(1);
    expect(wrapper.find('.aui--standard-tile-container')).to.have.length(1);
    expect(wrapper.find('.aui--standard-tile-clickable')).to.have.length(0);
    expect(wrapper.find('.aui--standard-tile-on-hover')).to.have.length(0);
    expect(wrapper.find('.aui--standard-tile-logo')).to.have.length(1);
    expect(wrapper.find('.aui--standard-tile-logo').children()).to.have.length(0);
    expect(wrapper.find('.aui--standard-tile-tags')).to.have.length(1);
    expect(wrapper.find('.aui--standard-tile-tags').children()).to.have.length(0);
    expect(wrapper.find('.aui--standard-tile-title')).to.have.length(1);
    expect(wrapper.find('.aui--standard-tile-title').text()).to.equal('');
    expect(wrapper.find('.aui--standard-tile-subtitle')).to.have.length(1);
    expect(wrapper.find('.aui--standard-tile-subtitle').text()).to.equal('');
    expect(wrapper.find('.card-component-content.aui--standard-tile-content')).to.have.length(1);
    expect(wrapper.find('.card-component-content.aui--standard-tile-content').text()).to.equal('');
    expect(wrapper.find('.aui--standard-tile-hover-content')).to.have.length(0);
  });

  it('should allow title prop', () => {
    const wrapper = shallow(<TileTemplate type="standard" item={makeItemProps({ title: 'test-title' })} />);
    expect(wrapper.find('.aui--standard-tile-title')).to.have.length(1);
    expect(wrapper.find('.aui--standard-tile-title').text()).to.equal('test-title');
  });

  it('should allow subTitle prop', () => {
    const wrapper = shallow(<TileTemplate type="standard" item={makeItemProps({ subTitle: 'test-sub-title' })} />);
    expect(wrapper.find('.aui--standard-tile-subtitle')).to.have.length(1);
    expect(wrapper.find('.aui--standard-tile-subtitle').text()).to.equal('test-sub-title');
  });

  it('should allow id prop', () => {
    const wrapper = mount(<TileTemplate type="standard" item={makeItemProps()} />);
    expect(wrapper.props().item.id).to.equal('123');
  });

  it('should allow logo prop', () => {
    const wrapper = shallow(<TileTemplate type="standard" item={makeItemProps({ logo: 'fake-url' })} />);
    expect(wrapper.find('.aui--standard-tile-logo')).to.have.length(1);
    expect(wrapper.find('.aui--standard-tile-logo').children()).to.have.length(1);
  });

  it('should allow classSuffix prop', () => {
    const wrapper = shallow(<TileTemplate type="standard" item={makeItemProps({ classSuffix: 'test' })} />);
    expect(wrapper.find('.aui--standard-tile.aui--standard-tile-test')).to.have.length(1);
  });

  it('should allow content prop', () => {
    const wrapper = shallow(<TileTemplate type="standard" item={makeItemProps({ content: 'test' })} />);
    expect(wrapper.find('.aui--standard-tile-content')).to.have.length(1);
    expect(
      wrapper
        .find('.aui--standard-tile-content')
        .children()
        .text()
    ).to.equal('test');
  });

  it('should allow onTileClick prop', () => {
    const onTileClickMock = sinon.spy();
    const wrapper = shallow(<TileTemplate type="standard" item={makeItemProps({ onTileClick: onTileClickMock })} />);
    expect(wrapper.find('.aui--standard-tile-clickable')).to.have.length(1);
    wrapper.find('.aui--standard-tile-container').simulate('click');
    expect(onTileClickMock.callCount).to.equal(1);
  });

  it('should not cause console error if onClick is undefined', () => {
    sandbox.stub(console, 'error');
    const wrapper = shallow(<TileTemplate type="standard" item={makeItemProps({})} />);
    wrapper.find('.aui--standard-tile-container').simulate('click');
    expect(console.error.callCount).to.equal(0);
  });

  it('should allow onTileHover prop', () => {
    const wrapper = shallow(<TileTemplate type="standard" item={makeItemProps({ onTileHover: <div>Foo</div> })} />);
    expect(wrapper.find('.aui--standard-tile-on-hover')).to.have.length(1);
    expect(wrapper.find('.aui--standard-tile-hover-content')).to.have.length(1);
    expect(
      wrapper
        .find('.aui--standard-tile-hover-content')
        .children()
        .text()
    ).to.equal('Foo');
  });

  it('should allow tags prop', () => {
    const wrapper = shallow(
      <TileTemplate
        type="standard"
        item={makeItemProps({
          tags: [
            { id: 'tag-0', name: 'Site', classSuffix: 'site', onTagClick: () => {} },
            { id: 'tag-1', name: 'Product', classSuffix: '', onTagClick: () => {} },
          ],
        })}
      />
    );
    expect(wrapper.find(Pill)).to.have.length(2);
    const siteTag = wrapper.find(Pill).first();
    expect(siteTag.prop('id')).to.equal('tag-0');
    expect(siteTag.prop('classSuffix')).to.equal('site');
    expect(siteTag.children().text()).to.equal('Site');
  });

  it('should trigger onTagClick if clicking any tag', () => {
    const onTagClickMock = sinon.spy();
    const wrapper = shallow(
      <TileTemplate
        type="standard"
        item={makeItemProps({
          tags: [
            { id: 'tag-0', name: 'Site', classSuffix: 'site', onTagClick: () => {} },
            { id: 'tag-1', name: 'Product', classSuffix: 'product', onTagClick: onTagClickMock },
          ],
        })}
      />
    );
    const productTag = wrapper.find(Pill).at(1);
    productTag.simulate('click');
    expect(onTagClickMock.callCount).to.equal(1);
  });

  it('should disable other onClick functions if there is a onHover', () => {
    const onTileClickMock = sinon.spy();
    const onTagClickMock = sinon.spy();
    const wrapper = shallow(
      <TileTemplate
        type="standard"
        item={makeItemProps({
          onTileClick: onTileClickMock,
          onTileHover: <div>Bar</div>,
          tags: [{ id: 'tag-0', name: 'Site', classSuffix: 'site', onTagClickMock }],
        })}
      />
    );
    expect(wrapper.find('.aui--standard-tile-clickable')).to.have.length(0);
    wrapper.find('.aui--standard-tile-container').simulate('click');
    expect(onTileClickMock.callCount).to.equal(0);
    wrapper
      .find(Pill)
      .first()
      .simulate('click');
    expect(onTagClickMock.callCount).to.equal(0);
  });
});

describe('<Tile />', () => {
  it('should render <Tile.Small />', () => {
    const wrapper = mount(<Tile.Small item={makeItemProps({})} />);
    expect(wrapper.find('.aui--small-tile')).to.have.length(1);
  });
  it('should render <Tile.Standard />', () => {
    const wrapper = mount(<Tile.Standard item={makeItemProps({})} />);
    expect(wrapper.find('.card-component.aui--standard-tile')).to.have.length(1);
  });
  it('should pass standard type to <TileTemplate />', () => {
    const wrapper = shallow(<Tile.Standard item={makeItemProps({})} />);
    expect(wrapper.find('TileTemplate').prop('type')).to.equal('standard');
  });
  it('should render <Tile.Large />', () => {
    const wrapper = mount(<Tile.Large item={makeItemProps({})} />);
    expect(wrapper.find('.card-component.aui--large-tile')).to.have.length(1);
  });
  it('should pass standard type to <TileTemplate />', () => {
    const wrapper = shallow(<Tile.Large item={makeItemProps({})} />);
    expect(wrapper.find('TileTemplate').prop('type')).to.equal('large');
  });
});
