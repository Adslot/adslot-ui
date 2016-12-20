import _ from 'lodash';
import React, { PropTypes } from 'react';
import classNames from 'classnames';

import Button from 'react-bootstrap/lib/Button';
import { Spinner } from 'alexandria-adslot';
import 'styles/adslotUi/SpinnerButton.scss';
import expandDts from '../../helpers/expandDtsHelper';

const SpinnerButton = (props) => {
  const {
    isLoading,
    children,
    dts,
  } = props;

  return (
    <Button
      disabled={isLoading || props.disabled}
      {..._.pick(props, _.keys(Button.propTypes))}
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
