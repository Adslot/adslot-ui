import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { FORMAT_ELEMENT_COMMAND } from 'lexical';
import ToolbarButton from './ToolbarButton';

const ALIGNMENTS = [
  { value: 'left', testId: 'align-left', ariaLabel: 'Align left', iconClass: 'align-left-icon' },
  { value: 'center', testId: 'align-center', ariaLabel: 'Align center', iconClass: 'align-center-icon' },
  { value: 'right', testId: 'align-right', ariaLabel: 'Align right', iconClass: 'align-right-icon' },
  { value: 'justify', testId: 'align-justify', ariaLabel: 'Justify', iconClass: 'align-justify-icon' },
];

const AlignButtons = ({ alignment, disabled, onSelect }) => {
  const [editor] = useLexicalComposerContext();

  return ALIGNMENTS.map(({ value, testId, ariaLabel, iconClass }) => (
    <ToolbarButton
      key={value}
      active={_.isEqual(alignment, value)}
      label={<div className={iconClass} data-testid={testId} alt="icon" />}
      onToggle={() => {
        editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, value);
        if (onSelect) onSelect(value);
      }}
      aria-label={ariaLabel}
      disabled={disabled}
    />
  ));
};

AlignButtons.propTypes = {
  alignment: PropTypes.string,
  disabled: PropTypes.bool,
  onSelect: PropTypes.func,
};

export default AlignButtons;
