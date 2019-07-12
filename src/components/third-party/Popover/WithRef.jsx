import _ from 'lodash';
import classnames from 'classnames';
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Popper from './Popper';
import { themes, popoverPlacements } from './constants';
import './styles.scss';

const WithRef = ({
  theme,
  title,
  dts,
  popoverClassNames,
  popoverContent,
  refElement,
  modifiers,
  wrapperStyles,
  placement,
  isOpen,
  arrowStyles,
  getContainer,
  popperRef,
}) => {
  const themeClass = _.includes(themes, theme) ? `popover-${theme}` : 'popover-light';
  const popoverClass = classnames('aui--popover-wrapper', themeClass, popoverClassNames);
  const boundariesElement = getContainer ? getContainer() : document.body;

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <Popper
      refElement={refElement}
      placement={placement}
      modifiers={modifiers}
      boundariesElement={boundariesElement}
      popoverClass={popoverClass}
      wrapperStyles={wrapperStyles}
      dts={dts}
      title={title}
      popoverContent={popoverContent}
      arrowStyles={arrowStyles}
      innerRef={popperRef}
    />,
    boundariesElement
  );
};

WithRef.propTypes = {
  refElement: PropTypes.instanceOf(Element).isRequired,
  title: PropTypes.string,
  theme: PropTypes.oneOf(themes),
  popoverClassNames: PropTypes.string,
  getContainer: PropTypes.func,
  arrowStyles: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  wrapperStyles: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  modifiers: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  placement: PropTypes.oneOf(popoverPlacements),
  popoverContent: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
  isOpen: PropTypes.bool,
  dts: PropTypes.string,
  popperRef: PropTypes.func,
};

WithRef.defaultProps = {
  theme: 'light',
  placement: 'auto',
};

export default WithRef;
