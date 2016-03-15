import _ from 'lodash';
import React from 'react';

/**
* fastStatelessWrapper - Limit re-render of a component to changeable props.
*                        Use when you have a performance problem, do not prematurely optimise.
*
* @param  {Node}  ComposedComponent The React component to render.
* @param  {Array} propsToCheck     An Array of properties causing re-render eg. `['foo.bar', 'baz']`.
* @return {Node}  A Component that wraps the provided React Component.
*/

const fastStatelessWrapper = (ComposedComponent, propsToCheck) =>
  class FastStatelessWrapperComponent extends React.Component { // eslint-disable-line react/prefer-stateless-function
    shouldComponentUpdate(nextProps) {
      const isEqualProps = (toGet) => {
        const getFromProps = (props) => _.get(props, toGet);

        return getFromProps(nextProps) === getFromProps(this.props);
      };

      return !_.some(propsToCheck, isEqualProps);
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  };

export default fastStatelessWrapper;
