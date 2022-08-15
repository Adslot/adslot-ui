import _ from 'lodash';
import classnames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

class Textarea extends React.PureComponent {
  constructor(props) {
    super(props);

    const valueString = _.toString(this.props.value);

    const charCountRemaining = this.props.maxLength - valueString.length;
    this.state = {
      charCountRemaining
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      charCountRemaining: this.props.maxLength - event.target.value.length
    });

    if (this.props.onChange) {
      this.props.onChange(event);
    }
  }

  render() {
    const {
      maxLength,
      statusClass
    } = this.props;

    const restProps = _.omit(this.props, ['statusClass']);

    const classNames = classnames('form-control', restProps.className);
    return _.isNil(maxLength) ? /*#__PURE__*/React.createElement("textarea", Object.assign({}, restProps, {
      className: classNames
    })) : /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("textarea", Object.assign({}, restProps, {
      className: classNames,
      onChange: this.handleChange
    })), /*#__PURE__*/React.createElement("span", {
      className: statusClass
    }, this.state.charCountRemaining, " characters remaining"));
  }

}

Textarea.propTypes = {
  maxLength: PropTypes.number,
  statusClass: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string
};
Textarea.defaultProps = {
  statusClass: ''
};
export default Textarea;