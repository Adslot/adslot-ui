import _ from 'lodash';
import React, { PropTypes, Component } from 'react';
import { OverlayTrigger, Popover } from 'react-bootstrap';

require('styles/adslotUi/TextEllipsis.scss');

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

  shouldComponentUpdate(nextProps, nextState) {
    return ((this.state.truncated !== nextState.truncated) || (this.props.text !== nextProps.text));
  }

  componentDidUpdate() {
    this.setTruncate();
  }

  setTruncate() {
    this.setState({
      truncated: this.container.scrollWidth > this.container.clientWidth,
    });
  }

  render() {
    const {
      text,
      popoverProps,
      overlayTriggerProps,
    } = this.props;
    const { truncated } = this.state;

    if (truncated) {
      const tooltip = (
        <Popover {...popoverProps}>{text}</Popover>
      );

      return (
        <OverlayTrigger {...overlayTriggerProps} overlay={tooltip}>
          <div className="text-ellipsis-component" ref={(ref) => { this.container = ref; }}>{text}</div>
        </OverlayTrigger>
      );
    }

    return (
      <div
        className="text-ellipsis-component"
        ref={(ref) => { this.container = ref; }}
      >
        {text}
      </div>
    );
  }
}

TextEllipsisComponent.propTypes = {
  text: PropTypes.string.isRequired,
  overlayTriggerProps: PropTypes.shape(_.omit(OverlayTrigger.propTypes, ['overlay'])).isRequired,
  popoverProps: PropTypes.shape(Popover.propTypes).isRequired,
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
