import _ from 'lodash';
import classnames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

class Textarea extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      charCountRemaining: this.props.maxLength,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      charCountRemaining: this.props.maxLength - event.target.value.length,
    });

    if (this.props.onChange) {
      this.props.onChange(event);
    }
  }

  render() {
    const { maxLength, statusClass } = this.props;
    const restProps = _.omit(this.props, ['statusClass']);
    const classNames = classnames('form-control', restProps.className);

    return _.isNil(maxLength) ? (
      <textarea {...restProps} className={classNames} />
    ) : (
      <div>
        <textarea {...restProps} className={classNames} onChange={this.handleChange} />
        <span className={statusClass}>{this.state.charCountRemaining} characters remaining</span>
      </div>
    );
  }
}

Textarea.propTypes = {
  maxLength: PropTypes.number,
  statusClass: PropTypes.string,
  onChange: PropTypes.func,
};

Textarea.defaultProps = {
  statusClass: '',
};

export default Textarea;
