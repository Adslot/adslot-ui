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
    bsStyle: PropTypes.string,
    inverse: PropTypes.bool,
    disabled: PropTypes.bool,
    bsSize: PropTypes.string,
  };

  injectProps(children) {
    return React.Children.map(children, child => {
      if (React.isValidElement(child)) {
        const buttonProps = {
          ...(this.props.bsStyle ? { bsStyle: this.props.bsStyle } : {}),
          ...(!_.isNil(this.props.inverse) ? { inverse: this.props.inverse } : {}),
          ...(!_.isNil(this.props.disabled) ? { disabled: this.props.disabled } : {}),
          ...(this.props.bsSize ? { bsSize: this.props.bsSize } : {}),
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
      <div {...expandDts(dts)} className="aui--button-group">
        {content}
      </div>
    );
  }
}

export default ButtonGroup;
