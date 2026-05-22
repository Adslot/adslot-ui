import React from 'react';
import { render, act } from 'testing';
import { $getRoot, $getSelection, $createParagraphNode } from 'lexical';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { buildInitialConfig } from './helpers';
import MaxLengthPlugin from './MaxLengthPlugin';

// jsdom cannot simulate contenteditable typing, so text is inserted by driving
// the Lexical instance directly (the same approach as index.spec.jsx).
const renderWithLimit = (maxLength) =>
  render(
    <LexicalComposer initialConfig={buildInitialConfig({ initialValue: '', disabled: false })}>
      <RichTextPlugin contentEditable={<ContentEditable />} ErrorBoundary={LexicalErrorBoundary} />
      <MaxLengthPlugin maxLength={maxLength} />
    </LexicalComposer>
  );

const getEditor = () => document.querySelector('[contenteditable="true"]').__lexicalEditor;

const typeInto = (text) =>
  act(() => {
    getEditor().update(
      () => {
        const root = $getRoot();
        const paragraph = root.getFirstChild() ?? $createParagraphNode();
        if (paragraph.getParent() === null) {
          root.append(paragraph);
        }
        paragraph.selectEnd();
        $getSelection().insertText(text);
      },
      { discrete: true }
    );
  });

const editorText = () => {
  let text = '';
  getEditor()
    .getEditorState()
    .read(() => {
      text = $getRoot().getTextContent();
    });
  return text;
};

it('blocks input beyond the limit', () => {
  renderWithLimit(5);
  typeInto('abcdefghij');
  expect(editorText()).toHaveLength(5);
});

it('allows input up to the limit', () => {
  renderWithLimit(5);
  typeInto('abc');
  expect(editorText()).toHaveLength(3);
});

it('does not enforce a limit when maxLength is Infinity', () => {
  renderWithLimit(Infinity);
  typeInto('abcdefghij');
  expect(editorText()).toHaveLength(10);
});

it('restores the editor when input arrives at exactly the limit', () => {
  renderWithLimit(5);
  typeInto('abcde');
  // The editor is now exactly at the limit; the next insertion takes the
  // restore-previous-state path rather than trimming from the anchor.
  typeInto('f');
  expect(editorText()).toHaveLength(5);
});
