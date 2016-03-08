import _ from 'lodash';
import React from 'react';

/**
* fastStatelessWrapper - Limit re-render of a component to certain changeable props.
*                        Use when you have found a performance problem, do not prematurely optimize.
*
* @param  {React Component} ComposedComponent The component to render.
* @return {Array}           propsToCheck      An Array of properties that can cause re-render eg. `['foo.bar', 'baz']`.
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
