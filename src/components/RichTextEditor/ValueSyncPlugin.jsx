import { useCallback, useEffect, useRef } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $generateHtmlFromNodes } from '@lexical/html';
import { isEditorEmpty, loadHTMLInto } from './helpers';

const CONTROLLED_SYNC_TAG = 'adslot-ui:controlled-sync';

/**
 * Owns both directions of the value sync through a single lastHtmlRef:
 *  - editor -> onChange: emits serialized HTML when content actually changes.
 *  - value -> editor: re-parses and replaces content when the controlled
 *    value prop changes externally.
 * Updating lastHtmlRef before the editor.update on an external sync stops the
 * resulting change from echoing back through onChange (no feedback loop).
 */
const ValueSyncPlugin = ({ value, onChange }) => {
  const [editor] = useLexicalComposerContext();
  const lastHtmlRef = useRef(null);

  const serialize = useCallback(
    (editorState) => {
      let html = '';
      editorState.read(() => {
        html = isEditorEmpty() ? '' : $generateHtmlFromNodes(editor, null);
      });
      return html;
    },
    [editor]
  );

  // Seed lastHtmlRef with the mounted content so initial value never emits.
  useEffect(() => {
    lastHtmlRef.current = serialize(editor.getEditorState());
  }, [editor, serialize]);

  // value -> editor (controlled mode only). The mount run is skipped because
  // the editor is already seeded with the initial value via buildInitialConfig;
  // only a later external change to value re-syncs the editor content.
  const isMountRef = useRef(true);
  useEffect(() => {
    if (isMountRef.current) {
      isMountRef.current = false;
      return;
    }
    if (_.isEqual(value, undefined) || _.isEqual(value, null) || _.isEqual(value, lastHtmlRef.current)) {
      return;
    }
    lastHtmlRef.current = value;
    // Tag the update so the registerUpdateListener below skips emitting
    // onChange — Lexical re-canonicalises the imported HTML, and emitting
    // that canonical form back to the parent would look like a phantom edit.
    loadHTMLInto(editor, value, { tag: CONTROLLED_SYNC_TAG });
  }, [editor, value]);

  const handleChange = useCallback(
    (editorState) => {
      if (!onChange) return;
      const html = serialize(editorState);
      if (_.isEqual(html, lastHtmlRef.current)) return;
      lastHtmlRef.current = html;
      onChange(html);
    },
    [onChange, serialize]
  );

  // OnChangePlugin hardcodes a prevEditorState.isEmpty() filter that swallows the first onChange from an empty editor — subscribe directly to bypass it.
  useEffect(() => {
    return editor.registerUpdateListener(({ editorState, dirtyElements, dirtyLeaves, tags }) => {
      if (_.isEqual(dirtyElements.size, 0) && _.isEqual(dirtyLeaves.size, 0)) return;
      if (tags.has('history-merge') || tags.has(CONTROLLED_SYNC_TAG)) return;
      handleChange(editorState);
    });
  }, [editor, handleChange]);

  return null;
};

ValueSyncPlugin.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default ValueSyncPlugin;
