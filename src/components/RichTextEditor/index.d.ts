import * as React from 'react';
import { EditorState, ContentState, RawDraftContentState } from 'draft-js';
import { createEditorStateWithText } from '@draft-js-plugins/editor';

export interface RichTextEditorMentions {
  name: string;
  title?: string;
  avatar?: string;
}

export interface RichTextEditorProps {
  className?: string;
  placeholder?: string;
  /**
   * Editor State
   */
  initialValue?: EditorState;
  /**
   * Editor State: Instance of <a href="https://draftjs.org/docs/api-reference-editor-state">draft-js editor state</a>
   */
  value?: EditorState;
  onChange?: (...args: any[]) => any;
  mentions?: RichTextEditorMentions[];
  onFileSelect?: (...args: any[]) => any;
  onFileRemove?: (...args: any[]) => any;
  fileFilter?: string;
}

declare const RichTextEditor: React.FC<RichTextEditorProps> & {
  createEmpty: typeof EditorState.createEmpty;
  createWithText: typeof createEditorStateWithText;
  stateToHTML: (input: ContentState) => string;
  stateFromHTML: (input: string) => EditorState;
  stateToPlainText: (input: ContentState) => string;
  stateToEntityList: (input: ContentState) => RawDraftContentState['entityMap'];
};

export default RichTextEditor;
