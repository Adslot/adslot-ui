import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

/**
 * Keeps the editor's editable state in sync with the `disabled` prop after the
 * initial mount (the initial value is set via initialConfig.editable).
 */
const EditablePlugin = ({ disabled }) => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    editor.setEditable(!disabled);
  }, [editor, disabled]);

  return null;
};

EditablePlugin.propTypes = {
  disabled: PropTypes.bool,
};

export default EditablePlugin;
