import { shallow } from 'enzyme';

exports.runComponentDidMount = ({ shallowRenderer }) => {
  shallowRenderer.instance().componentDidMount();
  shallowRenderer.update();
};

exports.runComponentWillReceiveProps = ({ shallowRenderer, nextProps }) => {
  shallowRenderer.instance().componentWillReceiveProps(nextProps);
  shallowRenderer.update();
};

exports.createAndMountComponent = (component) => {
  const shallowRenderer = shallow(component);
  exports.runComponentDidMount({ shallowRenderer });
  return shallowRenderer;
};
