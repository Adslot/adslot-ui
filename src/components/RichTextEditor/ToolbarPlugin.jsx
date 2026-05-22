import React from 'react';
import PropTypes from 'prop-types';
import BlockTypeSelect from './BlockTypeSelect';
import InlineStyleButtons from './InlineStyleButtons';
import HistoryButtons from './HistoryButtons';
import AlignAction from './AlignAction';
import IndentButtons from './IndentButtons';
import LinkAction from './LinkAction';
import InsertTableAction from './InsertTableAction';
import useActiveFormats from './useActiveFormats';
import { ToolbarPopoverProvider } from './useExclusivePopover';

const Divider = () => <span className="aui--editor-toolbar-divider" aria-hidden />;

/**
 * Renders the formatting toolbar inside the Lexical context. Active-format
 * state is read once here and shared by the toolbar controls. The popover
 * provider guarantees only one of Link / Insert-Table / Alignment is open
 * at a time.
 */
const ToolbarPlugin = ({ disabled }) => {
  const formats = useActiveFormats();

  return (
    <ToolbarPopoverProvider>
      <div className="aui--editor-style-buttons">
        <HistoryButtons disabled={disabled} />
        <Divider />
        <BlockTypeSelect blockType={formats.blockType} disabled={disabled} />
        <InlineStyleButtons formats={formats} disabled={disabled} />
        <Divider />
        <AlignAction alignment={formats.alignment} disabled={disabled} />
        <Divider />
        <IndentButtons disabled={disabled} />
        <Divider />
        <LinkAction disabled={disabled} isLink={formats.isLink} linkUrl={formats.linkUrl} />
        <InsertTableAction disabled={disabled} />
      </div>
    </ToolbarPopoverProvider>
  );
};

ToolbarPlugin.propTypes = {
  disabled: PropTypes.bool,
};

export default ToolbarPlugin;
