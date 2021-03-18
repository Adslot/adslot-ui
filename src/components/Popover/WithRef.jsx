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
      popoverClass={popoverClass}
      wrapperStyles={wrapperStyles}
      dts={dts}
      title={title}
      popoverContent={popoverContent}
      boundariesElement={boundariesElement}
      arrowStyles={arrowStyles}
      placement={placement}
      modifiers={modifiers}
      popperRef={popperRef}
    />,
    boundariesElement
  );
};

WithRef.propTypes = {
  refElement: PropTypes.instanceOf(Element),
  title: PropTypes.string,
  theme: PropTypes.oneOf(themes),
  popoverClassNames: PropTypes.string,
  getContainer: PropTypes.func,
  arrowStyles: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  wrapperStyles: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  modifiers: PropTypes.oneOfType([PropTypes.object, PropTypes.arrayOf(PropTypes.object)]), // eslint-disable-line react/forbid-prop-types
  placement: PropTypes.oneOf(popoverPlacements),
  popoverContent: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
  isOpen: PropTypes.bool,
  popperRef: PropTypes.func,
  dts: PropTypes.string,
};

WithRef.defaultProps = {
  theme: 'light',
  placement: 'auto',
};

export default React.memo(WithRef);
