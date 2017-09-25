import React from 'react';
import { shallow } from 'enzyme';
import fastStatelessWrapper from 'adslot-ui/fastStatelessWrapper';
import Grid from 'alexandria/Grid';

describe('fastStatelessWrapper', () => {
  it('should re-render on specified attribute change', () => {
    const GridFast = fastStatelessWrapper(Grid, ['mutable']);
    const shallowRenderer = shallow(<GridFast mutable="foo" fixed="bar" />);
    const nextProps = { mutable: 'quux', fixed: 'bar' };
    const shouldUpdate = shallowRenderer.instance().shouldComponentUpdate(nextProps);
    expect(shouldUpdate).to.equal(true);
  });

  it('should re-render on partial attribute matches', () => {
    const GridFast = fastStatelessWrapper(Grid, ['mutable1', 'mutable2']);
    const shallowRenderer = shallow(<GridFast mutable1="foo" mutable2="foo" fixed="bar" />);
    const nextProps = { mutable1: 'foo', mutable2: 'quux', fixed: 'bar' };
    const shouldUpdate = shallowRenderer.instance().shouldComponentUpdate(nextProps);
    expect(shouldUpdate).to.equal(true);
  });

  it('should re-render on specified attribute change one level deep', () => {
    const GridFast = fastStatelessWrapper(Grid, ['mutable']);
    const props = {
      mutable: {
        one: true,
      },
      fixed: 'bar',
    };
    const nextProps = {
      mutable: {
        one: false,
      },
      fixed: 'bar',
    };
    const shallowRenderer = shallow(<GridFast {...props} />);
    const shouldUpdate = shallowRenderer.instance().shouldComponentUpdate(nextProps);
    expect(shouldUpdate).to.equal(true);
  });

  it('should re-render on specified attribute change with one level deep equality', () => {
    const GridFast = fastStatelessWrapper(Grid, ['mutable']);
    const props = {
      mutable: {
        one: true,
      },
      fixed: 'bar',
    };
    const nextProps = {
      mutable: {
        one: true,
      },
      fixed: 'bar',
    };
    const shallowRenderer = shallow(<GridFast {...props} />);
    const shouldUpdate = shallowRenderer.instance().shouldComponentUpdate(nextProps);
    expect(shouldUpdate).to.equal(true);
  });

  it('should not re-render on unspecified attribute change', () => {
    const GridFast = fastStatelessWrapper(Grid, ['mutable']);
    const props = {
      mutable: 'foo',
      fixed: 'bar',
    };
    const nextProps = {
      mutable: 'foo',
      fixed: 'quux',
    };
    const shallowRenderer = shallow(<GridFast {...props} />);
    const shouldUpdate = shallowRenderer.instance().shouldComponentUpdate(nextProps);
    expect(shouldUpdate).to.equal(false);
  });
});
