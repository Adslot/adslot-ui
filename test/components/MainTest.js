/* eslint-env node, mocha */
/* global expect */
/* eslint no-console: 0*/

import createComponent from 'helpers/shallowRenderHelper';
import Main from 'components/Main';

describe('MainComponent', () => {
  let MainComponent;

  beforeEach(() => {
    MainComponent = createComponent(Main);
  });

  it('should have its component name as default className', () => {
    expect(MainComponent.props.className).to.equal('index');
  });
});
