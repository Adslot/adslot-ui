import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import './styles.scss';

const PARTIAL_STATE = 'partial';
class Switch extends React.PureComponent {
  state = { checked: this.props.defaultChecked || false };

  handleChange = (event) => {
    const { onChange, checked } = this.props;
    const targetCheckedValue = _.get(event, 'target.checked');

    if (_.isNil(checked)) this.setState({ checked: targetCheckedValue });

    if (_.isFunction(onChange)) onChange(targetCheckedValue);
  };

  render() {
    const { defaultChecked, checked, value, disabled, onChange, className, dts } = this.props;

    if (!_.isNil(checked) && !_.isNil(defaultChecked))
      console.warn(
        'Failed prop type: Contains an input of type checkbox with both `checked` and `defaultChecked` props. Input elements must be either controlled or uncontrolled'
      );

    if (!_.isNil(checked) && _.isNil(onChange))
      console.warn(
        'Failed prop type: You have provided a `checked` prop to Switch Component without an `onChange` handler. This will render a read-only field.'
      );

    const toggleInputChecked = !_.isNil(checked) ? checked : this.state.checked;

    const componentClassName = classnames([
      'aui--switch--input',
      {
        checked: toggleInputChecked === true,
        'partial-checked': checked === PARTIAL_STATE,
        disabled,
      },
      className,
    ]);

    return (
      <div className="aui--switch--component">
        <label className="aui--switch-label">
          <input
            data-testid="switch-checkbox"
            type="checkbox"
            checked={toggleInputChecked}
            value={value}
            disabled={disabled}
            onChange={this.handleChange}
            className={componentClassName}
            data-test-selector={dts}
          />
          <span className="aui--switch-slider" />
        </label>
      </div>
    );
  }
}

Switch.defaultProps = {
  value: '',
  disabled: false,
  dts: 'switch-component',
};

Switch.propTypes = {
  /**
   * 	switch value, if the value is un-controlled
   */
  defaultChecked: PropTypes.bool,
  /**
   * 	switch value, if the value is controlled: oneOf([true, false, 'partial']
   */
  checked: PropTypes.oneOf([true, false, PARTIAL_STATE]),
  value: PropTypes.string,
  disabled: PropTypes.bool,
  /**
   * 	This function is called when value is changed
   *  <br/>
   *  const onChange = (nextState) => ...
   */
  onChange: PropTypes.func,
  dts: PropTypes.string,
  className: PropTypes.string,
};

export default Switch;
