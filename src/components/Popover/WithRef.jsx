import _ from 'lodash';
import classnames from 'classnames';
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Popper from './Popper';
import { themes, popoverPlacements, popoverStrategies } from './constants';
import './styles.css';

const WithRef = ({
  theme = 'light',
  title,
  dts,
  popoverClassNames,
  popoverContent,
  refElement,
  modifiers,
  wrapperStyles,
  placement = 'auto',
  strategy,
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
      popoverClass={popoverClass}
      wrapperStyles={wrapperStyles}
      dts={dts}
      title={title}
      popoverContent={popoverContent}
      boundariesElement={boundariesElement}
      arrowStyles={arrowStyles}
      placement={placement}
      strategy={strategy}
      modifiers={modifiers}
      popperRef={popperRef}
    />,
    boundariesElement
  );
};

WithRef.propTypes = {
  refElement: PropTypes.instanceOf(HTMLElement),
  title: PropTypes.string,
  theme: PropTypes.oneOf(themes),
  popoverClassNames: PropTypes.string,
  getContainer: PropTypes.func,
  arrowStyles: PropTypes.object,
  wrapperStyles: PropTypes.object,
  modifiers: PropTypes.oneOfType([PropTypes.object, PropTypes.arrayOf(PropTypes.object)]),
  placement: PropTypes.oneOf(popoverPlacements),
  strategy: PropTypes.oneOf(popoverStrategies),
  popoverContent: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
  isOpen: PropTypes.bool,
  popperRef: PropTypes.func,
  dts: PropTypes.string,
};

export default WithRef;
