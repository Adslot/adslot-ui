import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';
import { expandDts } from '../../lib/utils';
import './styles.scss';

class ButtonGroup extends React.PureComponent {
  static propTypes = {
    dts: PropTypes.string,
    children: PropTypes.node,
    /**
     * PropTypes.oneOf(['primary', 'success', 'info', 'warning', 'danger', 'link'])
     */
    theme: PropTypes.oneOf(['primary', 'success', 'info', 'warning', 'danger', 'link']),
    inverse: PropTypes.bool,
    disabled: PropTypes.bool,
    size: PropTypes.string,
  };

  injectProps(children) {
    return React.Children.map(children, child => {
      if (React.isValidElement(child)) {
        const buttonProps = {
          ...(this.props.theme ? { theme: this.props.theme } : {}),
          ...(!_.isNil(this.props.inverse) ? { inverse: this.props.inverse } : {}),
          ...(!_.isNil(this.props.disabled) ? { disabled: this.props.disabled } : {}),
          ...(this.props.size ? { size: this.props.size } : {}),
        };

        const childNodes = React.Children.map(child.props.children, childNode =>
          React.isValidElement(childNode)
            ? React.cloneElement(childNode, {
                ...childNode.props,
                ...(childNode.type.name === Button.name ? buttonProps : {}),
              })
            : childNode
        );

        return React.cloneElement(child, {
          ...child.props,
          ...(child.type.name === Button.name ? buttonProps : {}),
          ...(!_.isEmpty(childNodes) ? { children: childNodes.length === 1 ? childNodes[0] : childNodes } : {}),
        });
      }

      return child;
    });
  }

  render() {
    const { children, dts } = this.props;
    const content = this.injectProps(children);

    return (
      <div {...expandDts(dts)} data-testid="button-group-wrapper" className="aui--button-group">
        {content}
      </div>
    );
  }
}

export default ButtonGroup;
