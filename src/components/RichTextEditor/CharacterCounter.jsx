import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getRoot } from 'lexical';

/**
 * Shows "count / maxLength" below the editor. Renders nothing when maxLength
 * is not finite (the limit is disabled).
 */
const CharacterCounter = ({ maxLength }) => {
  const [editor] = useLexicalComposerContext();
  const [count, setCount] = useState(0);

  const isCapped = _.isFinite(maxLength);
  useEffect(() => {
    if (!isCapped) return undefined;
    const sync = (editorState) => editorState.read(() => setCount($getRoot().getTextContentSize()));
    // Read once now: initialValue is seeded in a microtask that runs before
    // this effect, so the registerUpdateListener below would otherwise miss it.
    sync(editor.getEditorState());
    return editor.registerUpdateListener(({ editorState }) => sync(editorState));
  }, [editor, isCapped]);

  if (!isCapped) {
    return null;
  }

  return (
    <div data-testid="rich-text-editor-counter" className="aui--editor-counter">
      {`${count} / ${maxLength}`}
    </div>
  );
};

CharacterCounter.propTypes = {
  maxLength: PropTypes.number.isRequired,
};

export default CharacterCounter;
