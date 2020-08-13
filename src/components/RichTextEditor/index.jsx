import React from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import { stateFromHTML } from 'draft-js-import-html';
import PropTypes from 'prop-types';
import cc from 'classnames';
import InlineStyleButtons from './InlineStyleButtons';
import BlockStyleButtons from './BlockStyleButtons';
import './styles.scss';

const RichTextEditor = ({ className, value, initialValue, onChange, placeholder }) => {
  const editor = React.createRef(null);
  const focusEditor = () => editor.current.focus();

  if (value && !onChange)
    console.warn(
      'Failed prop type: You have provided a `value` prop to RichTextEditor component without an `onChange` handler. This will render a read-only field.'
    );

  const classNames = cc('aui--editor-root', className);

  const [editorState, setEditorState] = React.useState(initialValue || EditorState.createEmpty());

  const handleOnChange = newState => {
    if (!value) {
      setEditorState(newState);
    }
    if (onChange) {
      onChange(newState);
    }
  };

  const handleKeyCommand = command => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      handleOnChange(newState);
      return true;
    }
    return false;
  };

  return (
    <div className={classNames} onClick={focusEditor}>
      <div className="aui--editor-container">
        <Editor
          editorState={value || editorState}
          handleKeyCommand={handleKeyCommand}
          onChange={handleOnChange}
          placeholder={placeholder}
          ref={editor}
          spellCheck
        />
      </div>
      <div className="aui--editor-toolbar">
        <InlineStyleButtons editorState={editorState} onToggle={handleOnChange} />
        <BlockStyleButtons editorState={editorState} onToggle={handleOnChange} />
      </div>
    </div>
  );
};

RichTextEditor.propTypes = {
  className: PropTypes.string,
  placeholder: PropTypes.string,
  /** Editor State */
  initialValue: PropTypes.instanceOf(EditorState),
  /** Editor State: Instance of <a href="https://draftjs.org/docs/api-reference-editor-state">draft-js editor state</a> */
  value: PropTypes.instanceOf(EditorState),
  onChange: PropTypes.func,
};

RichTextEditor.defaultProps = {
  placeholder: 'Tell a story...',
};

RichTextEditor.createEmpty = EditorState.createEmpty;
RichTextEditor.stateToHTML = input => stateToHTML(input.getCurrentContent());
RichTextEditor.stateFromHTML = input => EditorState.createWithContent(stateFromHTML(input));

export default RichTextEditor;
