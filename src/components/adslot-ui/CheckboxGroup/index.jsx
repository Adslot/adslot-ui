import _ from 'lodash';
import React from 'react';
import classnames from 'classnames';
import { expandDts } from '../../../lib/utils';
import { checkboxGroupPropTypes } from '../../prop-types/inputPropTypes';

class CheckboxGroup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      checkedValues: [...this.props.value],
    };

    this.renderChildren = this.renderChildren.bind(this);
    this.onChangeDefault = this.onChangeDefault.bind(this);
  }

  onChangeDefault(event) {
    const { onChange, name } = this.props;
    const checkboxValue = event.currentTarget.value;
    this.setState(
      prevState =>
        _.includes(prevState.checkedValues, checkboxValue)
          ? {
              checkedValues: prevState.checkedValues.filter(value => value !== checkboxValue),
            }
          : {
              checkedValues: [...prevState.checkedValues, checkboxValue],
            },
      () => {
        onChange(this.state.checkedValues, name);
      }
    );
  }

  renderChildren() {
    return React.Children.map(this.props.children, child =>
      React.cloneElement(child, {
        name: this.props.name,
        checked: _.includes(this.state.checkedValues, child.props.value),
        onChange: (...args) => {
          child.props.onChange(...args);
          this.onChangeDefault(...args);
        },
        inline: this.props.inline,
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

CheckboxGroup.defaultProps = {
  value: [],
  onChange: _.noop,
};

export default CheckboxGroup;
