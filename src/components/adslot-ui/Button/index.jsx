import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { Spinner } from 'alexandria';
import './styles.scss';

const classPrefix = 'aui-component';

class Button extends React.PureComponent {
  render() {
    const { disabled, small, isLoading, inverse, children, style, onClick } = this.props;
    const isStyledBtn = style !== 'default';
    const className = classnames([
      `${classPrefix}--btn`,
      {
        [`${classPrefix}--btn-sm`]: small,
        [`${classPrefix}--is-disabled`]: disabled,
        [`btn-is-${style}`]: isStyledBtn && !inverse,
        [`btn-is-inverse-${style}`]: isStyledBtn && inverse,
      },
    ]);

    const buttonProps = {
      className,
      disabled,
      'data-is-loading': isLoading,
      ...(disabled || isLoading ? {} : { onClick }),
    };
    return (
      <button {...buttonProps}>
        <div className="btn-label">{isLoading ? <Spinner size="small" /> : children}</div>
      </button>
    );
  }
}

Button.defaultProps = {
  small: false,
  isLoading: false,
  style: 'default',
};

Button.propTypes = {
  disabled: PropTypes.bool,
  small: PropTypes.bool,
  isLoading: PropTypes.bool,
  inverse: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  style: PropTypes.oneOf(['primary', 'default', 'warning', 'alert', 'success']),
  onClick: PropTypes.func,
};

export default Button;
