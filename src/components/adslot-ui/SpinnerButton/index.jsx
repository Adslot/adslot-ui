/* eslint-disable react/prop-types */
import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from 'react-bootstrap/lib/Button';
import Spinner from 'alexandria/Spinner';
import { expandDts } from 'lib/utils';

require('./styles.scss');

class SpinnerButton extends React.PureComponent {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    const { isLoading, children, dts } = this.props;
    return (
      <Button
        {..._.pick(this.props, _.keys(Button.propTypes))}
        disabled={isLoading || this.props.disabled}
        className={classNames('spinner-button-component', this.props.className)}
        {...expandDts(dts)}
      >
        {isLoading ? (
          <div className="spinner-container">
            <Spinner size={_.includes(['lg', 'large'], this.props.bsSize) ? 'medium' : 'small'} />
          </div>
        ) : null}
        <div className={isLoading ? 'spinner-button-component-children-container' : null}>{children}</div>
      </Button>
    );
  }
}

SpinnerButton.propTypes = _.assign(
  {
    isLoading: PropTypes.bool,
    dts: PropTypes.string,
  },
  Button.propTypes
);

SpinnerButton.defaultProps = {
  isLoading: false,
};

export default SpinnerButton;
