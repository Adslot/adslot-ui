import _ from 'lodash';
import classnames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import { expandDts } from '../../lib/utils';

class RadioGroup extends React.PureComponent {
  onChangeDefault = (event) => {
    const newValue = event.currentTarget.value;
    this.props.onChange(newValue);
  };

  renderChildren = () =>
    React.Children.map(this.props.children, (child) => {
      const childProps = _.assign({}, child.props, {
        name: this.props.name,
        checked: this.props.value === child.props.value,
        onChange: (...args) => {
          child.props.onChange(...args);
          this.onChangeDefault(...args);
        },
        inline: this.props.inline,
      });

      return React.cloneElement(child, childProps);
    });

  render() {
    const { dts, className, id } = this.props;
    const classNames = classnames(['radio-group-component', className]);

    return (
      <div data-testid="radio-group-wrapper" id={id} className={classNames} {...expandDts(dts)}>
        {this.renderChildren()}
      </div>
    );
  }
}

RadioGroup.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  onChange: PropTypes.func.isRequired,
  dts: PropTypes.string,
  inline: PropTypes.bool,
};

export default RadioGroup;
