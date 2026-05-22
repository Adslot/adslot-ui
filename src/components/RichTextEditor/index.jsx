import _ from 'lodash';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cc from 'classnames';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { AutoLinkPlugin } from '@lexical/react/LexicalAutoLinkPlugin';
import { TablePlugin } from '@lexical/react/LexicalTablePlugin';
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { TRANSFORMERS } from '@lexical/markdown';
import ToolbarPlugin from './ToolbarPlugin';
import ValueSyncPlugin from './ValueSyncPlugin';
import EditablePlugin from './EditablePlugin';
import MentionsPlugin from './MentionsPlugin';
import MentionAction from './MentionAction';
import FileUploadAction from './FileUploadAction';
import FilePreviewList from './FilePreviewList';
import MaxLengthPlugin from './MaxLengthPlugin';
import CharacterCounter from './CharacterCounter';
import PlainTextPastePlugin from './PlainTextPastePlugin';
import autoLinkMatchers from './autoLinkMatchers';
import { buildInitialConfig, isValidLinkUrl, loadHTMLInto, plainTextFromHTML } from './helpers';
import { stateFromHTML, stateToHTML, useTruncateState } from './richTextState';
import invariant from '../../invariant';
import './styles.css';

const RichTextEditor = ({
  className,
  value,
  initialValue,
  onChange,
  placeholder = 'Tell a story...',
  mentions,
  onFileSelect,
  onFileRemove,
  fileFilter = '.jpg,.jpeg,.png,.gif,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.psd,.csv,.zip,.7z',
  maxLength = Number.POSITIVE_INFINITY,
  pastePlainText = false,
  disabled = false,
}) => {
  invariant(
    !(value && !onChange),
    'Failed prop type: You have provided a `value` prop to RichTextEditor component without an `onChange` handler. This will render a read-only field.'
  );

  const [initialConfig] = useState(() => buildInitialConfig({ value, initialValue, disabled }));

  const [files, setFiles] = useState({});

  const handleFileUpload = async (file) => {
    const id = _.uniqueId('file_');
    setFiles((prevState) => ({ ...prevState, [id]: { id, name: file.name, path: '', isUploading: true } }));

    const path = await onFileSelect(file, id);

    if (path) {
      setFiles((prevState) => ({ ...prevState, [id]: { id, name: file.name, path, isUploading: false } }));
    }
  };

  const handleFileRemove = async (file) => {
    await onFileRemove(file);
    setFiles((prevState) => {
      const nextState = { ...prevState };
      delete nextState[file.id];
      return nextState;
    });
  };

  return (
    <div data-testid="rich-text-editor-wrapper" className={cc('aui--editor-root', className)}>
      <LexicalComposer initialConfig={initialConfig}>
        <div className="aui--editor-container">
          <RichTextPlugin
            contentEditable={
              <ContentEditable
                className="aui--editor-content"
                spellCheck
                aria-placeholder={placeholder}
                placeholder={<div className="aui--editor-placeholder">{placeholder}</div>}
              />
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
        </div>
        <HistoryPlugin />
        <ListPlugin />
        <LinkPlugin validateUrl={isValidLinkUrl} />
        <AutoLinkPlugin matchers={autoLinkMatchers} />
        <TablePlugin />
        <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
        {!_.isEmpty(mentions) && <MentionsPlugin mentions={mentions} />}
        <ValueSyncPlugin value={value} onChange={onChange} />
        <EditablePlugin disabled={disabled} />
        <MaxLengthPlugin maxLength={maxLength} />
        {pastePlainText && <PlainTextPastePlugin />}
        <FilePreviewList files={files} onFileRemove={handleFileRemove} disabled={disabled} />
        <CharacterCounter maxLength={maxLength} />
        <div className="aui--editor-toolbar">
          <ToolbarPlugin disabled={disabled} />
          <div data-testid="rich-text-editor-advanced-buttons" className="aui--editor-advanced-buttons">
            {!_.isEmpty(mentions) && <MentionAction disabled={disabled} />}
            {_.isFunction(onFileSelect) && _.isFunction(onFileRemove) && (
              <FileUploadAction fileFilter={fileFilter} onFileUpload={handleFileUpload} disabled={disabled} />
            )}
          </div>
        </div>
      </LexicalComposer>
    </div>
  );
};

RichTextEditor.propTypes = {
  className: PropTypes.string,
  placeholder: PropTypes.string,
  initialValue: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  mentions: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      title: PropTypes.string,
      avatar: PropTypes.string,
    })
  ),
  onFileSelect: PropTypes.func,
  onFileRemove: PropTypes.func,
  fileFilter: PropTypes.string,
  maxLength: PropTypes.number,
  pastePlainText: PropTypes.bool,
  disabled: PropTypes.bool,
};

RichTextEditor.plainTextFromHTML = plainTextFromHTML;
RichTextEditor.stateFromHTML = stateFromHTML;
RichTextEditor.stateToHTML = stateToHTML;
RichTextEditor.useTruncateState = useTruncateState;
RichTextEditor.loadHTMLInto = loadHTMLInto;

export default RichTextEditor;
