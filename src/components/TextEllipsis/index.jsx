import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import Popover from '../Popover';
import './styles.scss';

class TextEllipsisComponent extends React.PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    popoverProps: PropTypes.shape(_.pick(Popover.propTypes, ['placement', 'trigger'])),
  };

  static defaultProps = {
    popoverProps: {
      placement: 'top',
      trigger: 'hover',
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
    const { popoverProps } = this.props;
    const { truncated } = this.state;

    return (
      <Popover
        {...popoverProps}
        isOpen={truncated}
        popoverContent={this.props.children}
        className="aui--text-ellipsis-wrapper"
      >
        <div className="text-ellipsis-component" ref={this.container}>
          {this.props.children}
        </div>
      </Popover>
    );
  }
}

export default TextEllipsisComponent;
