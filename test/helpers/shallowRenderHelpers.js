/**
 * Function to get the shallow output for a given component
 * As we are using phantom.js, we also need to include the fn.proto.bind shim!
 *
 * @see http://simonsmith.io/unit-testing-react-components-without-a-dom/
 * @author simonsmith
 */

import React from 'react';
import TestUtils from 'react-addons-test-utils';

/**
 * Get the shallow rendered component
 *
 * @param  {Object} component The component to return the output for
 * @param  {Object} props [optional] The components properties
 * @param  {Mixed} ...children [optional] List of children
 * @return {Object} Shallow rendered output
 */
exports.createComponent = (component, props = {}, ...children) => {
  const shallowRenderer = exports.createShallowRenderer(component, props, ...children);
  return shallowRenderer.getRenderOutput();
};

exports.runComponentDidMount = ({ shallowRenderer }) =>
  shallowRenderer._instance._instance.componentDidMount();

exports.runComponentWillReceiveProps = ({ shallowRenderer, nextProps }) =>
  shallowRenderer._instance._instance.componentWillReceiveProps(nextProps);

exports.runComponentWillUnmount = ({ shallowRenderer }) =>
  shallowRenderer._instance._instance.componentWillUnmount();

exports.runShouldComponentUpdate = ({ shallowRenderer, nextProps }) =>
  shallowRenderer._instance._instance.shouldComponentUpdate(nextProps);

exports.createAndMountComponent = (component, props = {}, ...children) => {
  const shallowRenderer = exports.createShallowRenderer(component, props, ...children);
  exports.runComponentDidMount({ shallowRenderer });
  return shallowRenderer.getRenderOutput();
};

exports.createShallowRenderer = (component, props = {}, ...children) => {
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(React.createElement(component, props, children.length > 1 ? children : children[0]));
  return shallowRenderer;
};
