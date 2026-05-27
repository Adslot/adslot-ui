import { useEffect } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $insertDataTransferForPlainText } from '@lexical/clipboard';
import { $getSelection, $isRangeSelection, COMMAND_PRIORITY_NORMAL, PASTE_COMMAND } from 'lexical';

/**
 * When mounted, intercepts paste and inserts only the clipboard's plain text,
 * discarding pasted rich formatting. Mounted only when pastePlainText is true.
 */
const PlainTextPastePlugin = () => {
  const [editor] = useLexicalComposerContext();

  useEffect(
    () =>
      editor.registerCommand(
        PASTE_COMMAND,
        (event) => {
          const selection = $getSelection();
          if (!$isRangeSelection(selection) || !event.clipboardData) {
            return false;
          }
          event.preventDefault();
          editor.update(() => {
            $insertDataTransferForPlainText(event.clipboardData, selection);
          });
          return true;
        },
        COMMAND_PRIORITY_NORMAL
      ),
    [editor]
  );

  return null;
};

export default PlainTextPastePlugin;
