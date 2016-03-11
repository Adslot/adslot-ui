import fastStatelessWrapper from 'components/adslotUi/fastStatelessWrapper';
import React from 'react';
import { Grid } from 'alexandria-adslot';
import { shallow } from 'enzyme';

describe('fastStatelessWrapper', () => {
  it('should re-render on specified attribute change', () => {
    const GridFast = fastStatelessWrapper(Grid, ['mutable']);
    const shallowRenderer = shallow(<GridFast mutable="foo" fixed="bar" />);
    const nextProps = { mutable: 'quux', fixed: 'bar' };
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
