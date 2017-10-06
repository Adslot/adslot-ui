import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { OverlayTrigger, Popover } from 'react-bootstrap';

require('./styles.scss');

class TextEllipsisComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      truncated: false,
    };
  }

  componentDidMount() {
    this.setTruncate();
  }

  componentDidUpdate() {
    this.setTruncate();
  }

  setTruncate() {
    const nextTruncateState = this.container.scrollWidth > this.container.clientWidth;
    if (this.state.truncated !== nextTruncateState) {
      this.setState({
        truncated: nextTruncateState,
      });
    }
  }

  render() {
    const {
      popoverProps,
      overlayTriggerProps,
    } = this.props;
    const { truncated } = this.state;

    if (truncated) {
      const tooltip = (
        <Popover {...popoverProps}>{this.props.children}</Popover>
      );

      return (
        <OverlayTrigger {...overlayTriggerProps} overlay={tooltip}>
          <div className="text-ellipsis-component" ref={(ref) => { this.container = ref; }}>{this.props.children}</div>
        </OverlayTrigger>
      );
    }

    return (
      <div
        className="text-ellipsis-component"
        ref={(ref) => { this.container = ref; }}
      >
        {this.props.children}
      </div>
    );
  }
}

TextEllipsisComponent.propTypes = {
  children: PropTypes.node.isRequired,
  overlayTriggerProps: PropTypes.shape(_.omit(OverlayTrigger.propTypes, ['overlay'])),
  popoverProps: PropTypes.shape(Popover.propTypes),
};

TextEllipsisComponent.defaultProps = {
  overlayTriggerProps: {
    trigger: ['focus', 'hover'],
    placement: 'top',
  },
  popoverProps: {
    id: 'popover',
    placement: 'top',
  },
};

export default TextEllipsisComponent;
