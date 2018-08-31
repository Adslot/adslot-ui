import _ from 'lodash';
import React from 'react';
import classnames from 'classnames';
import { expandDts } from '../../../lib/utils';
import { checkboxGroupPropTypes } from '../../prop-types/inputPropTypes';

class CheckboxGroup extends React.Component {
  constructor(props) {
    super(props);

    this.renderChildren = this.renderChildren.bind(this);
    this.onChangeDefault = this.onChangeDefault.bind(this);
  }

  onChangeDefault(event) {
    const { onChange, name, value } = this.props;
    const checkboxValue = event.currentTarget.value;

    const newValues = _.includes(value, checkboxValue)
      ? value.filter(item => item !== checkboxValue)
      : [...value, checkboxValue];

    onChange(newValues, name);
  }

  renderChildren() {
    const { children, value, name, inline } = this.props;
    return React.Children.map(children, child =>
      React.cloneElement(child, {
        name,
        checked: _.includes(value, child.props.value),
        onChange: (...args) => {
          child.props.onChange(...args);
          this.onChangeDefault(...args);
        },
        inline,
      })
    );
  }

  render() {
    const { id, className, dts } = this.props;
    const classNames = classnames(['checkbox-group-component', className]);

    return (
      <div id={id} className={classNames} {...expandDts(dts)}>
        {this.renderChildren()}
      </div>
    );
  }
}

CheckboxGroup.propTypes = checkboxGroupPropTypes;

export default CheckboxGroup;
