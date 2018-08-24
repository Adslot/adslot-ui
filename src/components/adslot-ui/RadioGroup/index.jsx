import _ from 'lodash';
import React from 'react';
import classnames from 'classnames';
import { expandDts } from '../../../lib/utils';
import { radioGroupPropTypes } from '../../prop-types/inputPropTypes';

class RadioGroup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: props.value,
    };

    this.onChangeDefault = this.onChangeDefault.bind(this);
    this.renderChildren = this.renderChildren.bind(this);
  }

  onChangeDefault(event) {
    const newValue = event.currentTarget.value;
    this.setState({ value: newValue });
    this.props.onChange(newValue);
  }

  renderChildren() {
    return React.Children.map(this.props.children, child => {
      const childProps = _.assign({}, child.props, {
        name: this.props.name,
        checked: this.state.value === child.props.value,
        onChange: (...args) => {
          child.props.onChange(...args);
          this.onChangeDefault(...args);
        },
        inline: this.props.inline,
      });

      return React.cloneElement(child, childProps);
    });
  }

  render() {
    const { dts, className, id } = this.props;
    const classNames = classnames(['radio-group-component', className]);

    return (
      <div id={id} className={classNames} {...expandDts(dts)}>
        {this.renderChildren()}
      </div>
    );
  }
}

RadioGroup.propTypes = radioGroupPropTypes;

RadioGroup.defaultProps = {
  onChange: _.noop,
};

export default RadioGroup;
