import fastStatelessWrapper from 'components/adslotUi/fastStatelessWrapper';
import { Grid } from 'alexandria-adslot';
import { createShallowRenderer, runShouldComponentUpdate } from 'testHelpers/shallowRenderHelpers';

describe('fastStatelessWrapper', () => {
  it('should re-render on specified attribute change', () => {
    const GridFast = fastStatelessWrapper(Grid, ['mutable']);

    const shallowRenderer = createShallowRenderer(GridFast, {
      mutable: 'foo',
      fixed: 'bar',
    });
    const nextProps = {
      mutable: 'quux',
      fixed: 'bar',
    };
    const shouldUpdate = runShouldComponentUpdate({ shallowRenderer, nextProps });
    expect(shouldUpdate).to.equal(true);
  });

  it('should re-render on specified attribute change one level deep', () => {
    const GridFast = fastStatelessWrapper(Grid, ['mutable']);

    const shallowRenderer = createShallowRenderer(GridFast, {
      mutable: {
        one: true,
      },
      fixed: 'bar',
    });
    const nextProps = {
      mutable: {
        one: false,
      },
      fixed: 'bar',
    };
    const shouldUpdate = runShouldComponentUpdate({ shallowRenderer, nextProps });
    expect(shouldUpdate).to.equal(true);
  });

  it('should re-render on specified attribute change with one level deep equality', () => {
    const GridFast = fastStatelessWrapper(Grid, ['mutable']);

    const shallowRenderer = createShallowRenderer(GridFast, {
      mutable: {
        one: true,
      },
      fixed: 'bar',
    });
    const nextProps = {
      mutable: {
        one: true,
      },
      fixed: 'bar',
    };
    const shouldUpdate = runShouldComponentUpdate({ shallowRenderer, nextProps });
    expect(shouldUpdate).to.equal(true);
  });

  it('should not re-render on unspecified attribute change', () => {
    const GridFast = fastStatelessWrapper(Grid, ['mutable']);

    const shallowRenderer = createShallowRenderer(GridFast, {
      mutable: 'foo',
      fixed: 'bar',
    });
    const nextProps = {
      mutable: 'foo',
      fixed: 'quux',
    };
    const shouldUpdate = runShouldComponentUpdate({ shallowRenderer, nextProps });
    expect(shouldUpdate).to.equal(false);
  });
});
