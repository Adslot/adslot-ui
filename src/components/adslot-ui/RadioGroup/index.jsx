import _ from 'lodash';
import React from 'react';
import { expandDts } from '../../../lib/utils';
import { radioGroupPropTypes } from '../../prop-types/inputPropTypes';

class RadioGroup extends React.Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    return nextProps.value === prevState.value ? null : { value: nextProps.value };
  }

  constructor(props) {
    super(props);

    this.state = {
      value: props.value,
    };

    this.onChangeDefault = this.onChangeDefault.bind(this);
    this.renderChildren = this.renderChildren.bind(this);
  }

  onChangeDefault(event) {
    this.setState({ value: event.target.value });
    if (this.props.onChange) {
      this.props.onChange(event);
    }
  }

  renderChildren() {
    return React.Children.map(this.props.children, child => {
      const childProps = _.assign({}, child.props, {
        name: this.props.name,
        checked: this.state.value === child.props.value,
        onChange: (...args) => {
          if (child.props.onChange) child.props.onChange(...args);
          this.onChangeDefault(...args);
        },
      });

      return React.cloneElement(child, childProps);
    });
  }

  render() {
    const { dts, className, id } = this.props;
    const componentProps = {
      id,
      className: _(['radio-group-component', className])
        .compact()
        .join(' '),
    };

    return (
      <div {...componentProps} {...expandDts(dts)}>
        {this.renderChildren()}
      </div>
    );
  }
}

RadioGroup.propTypes = radioGroupPropTypes;

export default RadioGroup;
