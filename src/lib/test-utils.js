import { shallow } from 'enzyme';

export const runComponentDidMount = ({ shallowRenderer }) => {
  shallowRenderer.instance().componentDidMount();
  shallowRenderer.update();
};

export const createAndMountComponent = component => {
  const shallowRenderer = shallow(component);
  runComponentDidMount({ shallowRenderer });
  return shallowRenderer;
};
