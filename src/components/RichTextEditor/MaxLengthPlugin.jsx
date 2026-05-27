import { useEffect } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $restoreEditorState } from '@lexical/utils';
import { $trimTextContentFromAnchor } from '@lexical/selection';
import { $getSelection, $isRangeSelection, RootNode } from 'lexical';

/**
 * Hard-enforces a maximum visible-text length. Ported from the official
 * Lexical Playground MaxLengthPlugin: on each RootNode transform, if the text
 * content has grown past maxLength it restores the previous state or trims
 * the overflow from the selection anchor. A non-finite maxLength disables it.
 */
const MaxLengthPlugin = ({ maxLength }) => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (!_.isFinite(maxLength)) {
      return undefined;
    }
    let lastRestoredEditorState = null;

    return editor.registerNodeTransform(RootNode, (rootNode) => {
      const selection = $getSelection();
      if (!$isRangeSelection(selection) || !selection.isCollapsed()) {
        return;
      }
      const prevEditorState = editor.getEditorState();
      const prevTextContentSize = prevEditorState.read(() => rootNode.getTextContentSize());
      const textContentSize = rootNode.getTextContentSize();
      if (!_.isEqual(prevTextContentSize, textContentSize)) {
        const delCount = textContentSize - maxLength;
        const anchor = selection.anchor;
        if (delCount > 0) {
          // A paste that lands exactly on the limit cannot be trimmed in
          // place without losing the anchor, so restore the prior state.
          if (_.isEqual(prevTextContentSize, maxLength) && !_.isEqual(lastRestoredEditorState, prevEditorState)) {
            lastRestoredEditorState = prevEditorState;
            $restoreEditorState(editor, prevEditorState);
          } else {
            $trimTextContentFromAnchor(editor, anchor, delCount);
          }
        }
      }
    });
  }, [editor, maxLength]);

  return null;
};

MaxLengthPlugin.propTypes = {
  maxLength: PropTypes.number.isRequired,
};

export default MaxLengthPlugin;
