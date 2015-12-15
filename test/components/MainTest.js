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

  it('should have a modal component', () => {
    var modalComponent = MainComponent.props.children[8];
    expect(modalComponent.props.bsClass).to.equal('modal');
    expect(modalComponent.props.bsSize).to.equal('small');
    expect(modalComponent.props.keyboard).to.equal(false);
    expect(modalComponent.props.backdrop).to.equal(true);
  });
});
