import _ from 'lodash';
import React, { PropTypes } from 'react';
import classNames from 'classnames';
import Button from 'react-bootstrap/lib/Button';
import Spinner from 'components/alexandria/SpinnerComponent';
import expandDts from '../../helpers/expandDtsHelper';

require('styles/adslotUi/SpinnerButton.scss');

const SpinnerButton = (props) => {
  const {
    isLoading,
    children,
    dts,
  } = props;

  return (
    <Button
      {..._.pick(props, _.keys(Button.propTypes))}
      disabled={isLoading || props.disabled}
      className={classNames('spinner-button-component', props.className)}
      {...expandDts(dts)}
    >
      {isLoading ?
        <div className="spinner-container">
          <Spinner size={_.includes(['lg', 'large'], props.bsSize) ? 'medium' : 'small'} />
        </div>
      : null }
      <div className={isLoading ? 'spinner-button-component-children-container' : null}>{children}</div>
    </Button>
  );
};

SpinnerButton.propTypes = _.assign({
  isLoading: PropTypes.bool,
  dts: PropTypes.string,
}, Button.propTypes);

SpinnerButton.defaultProps = {
  isLoading: false,
};

export default SpinnerButton;
