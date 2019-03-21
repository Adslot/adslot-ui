import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { OverlayTrigger } from 'react-bootstrap';
import { Popover } from 'third-party';

class TextEllipsisComponent extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    overlayTriggerProps: PropTypes.shape(_.omit(OverlayTrigger.propTypes, ['overlay'])),
    popoverProps: PropTypes.shape(Popover.propTypes),
  };

  static defaultProps = {
    overlayTriggerProps: {
      trigger: ['focus', 'hover'],
      placement: 'top',
    },
    popoverProps: {
      id: 'popover',
      placement: 'top',
    },
  };

  constructor(props) {
    super(props);

    this.container = React.createRef();
  }

  state = {
    truncated: false,
  };

  componentDidMount() {
    this.setTruncate();
  }

  componentDidUpdate() {
    this.setTruncate();
  }

  setTruncate() {
    const nextTruncateState = this.container.current.scrollWidth > this.container.current.clientWidth;
    if (this.state.truncated !== nextTruncateState) {
      this.setState({
        truncated: nextTruncateState,
      });
    }
  }

  render() {
    const { popoverProps, overlayTriggerProps } = this.props;
    const { truncated } = this.state;

    if (truncated) {
      const tooltip = <Popover {...popoverProps}>{this.props.children}</Popover>;

      return (
        <OverlayTrigger {...overlayTriggerProps} overlay={tooltip}>
          <div className="text-ellipsis-component" ref={this.container}>
            {this.props.children}
          </div>
        </OverlayTrigger>
      );
    }

    return (
      <div className="text-ellipsis-component" ref={this.container}>
        {this.props.children}
      </div>
    );
  }
}

export default TextEllipsisComponent;
