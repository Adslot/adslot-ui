import * as React from 'react';
import { EditorState, RawDraftContentState } from 'draft-js';
import { createEditorStateWithText } from '@draft-js-plugins/editor';

export interface RichTextEditorMentions {
  name: string;
  title?: string;
  avatar?: string;
}

export interface RichTextEditorProps {
  className?: string;
  placeholder?: string;
  initialValue?: string;
  value?: string;
  onChange?: (...args: any[]) => any;
  mentions?: RichTextEditorMentions[];
  onFileSelect?: (...args: any[]) => any;
  onFileRemove?: (...args: any[]) => any;
  fileFilter?: string;
  disabled?: boolean;
}

declare const RichTextEditor: React.FC<RichTextEditorProps> & {
  createEmpty: typeof EditorState.createEmpty;
  createWithText: typeof createEditorStateWithText;
  stateToHTML: (input: EditorState) => string;
  stateFromHTML: (input: string, options?: { parser?: (html: string) => HTMLBodyElement }) => EditorState;
  stateToPlainText: (input: EditorState) => string;
  stateToEntityList: (input: EditorState) => RawDraftContentState['entityMap'];
  plainTextFromHTML: (input: string) => string;
  useTruncateState: ({
    editorState,
    briefCharCount,
    truncateString,
  }: {
    editorState: EditorState;
    briefCharCount: number;
    truncateString: string;
  }) => { totalCharCount: number; truncatedState: EditorState };
};

export default RichTextEditor;
