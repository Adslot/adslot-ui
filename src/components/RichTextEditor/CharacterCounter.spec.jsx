import React from 'react';
import { render, screen, act } from 'testing';
import { $getRoot, $getSelection, $createParagraphNode } from 'lexical';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { buildInitialConfig } from './helpers';
import CharacterCounter from './CharacterCounter';

// Lexical seeds initialValue and resets placeholder visibility in a microtask
// after mount; flush it inside act so React updates do not leak past render.
const renderCounter = async (maxLength, initialValue = '') => {
  const utils = render(
    <LexicalComposer initialConfig={buildInitialConfig({ initialValue, disabled: false })}>
      <RichTextPlugin contentEditable={<ContentEditable />} ErrorBoundary={LexicalErrorBoundary} />
      <CharacterCounter maxLength={maxLength} />
    </LexicalComposer>
  );
  await act(async () => {
    await Promise.resolve();
  });
  return utils;
};

const getEditor = () => document.querySelector('[contenteditable="true"]').__lexicalEditor;

// jsdom cannot simulate contenteditable typing; drive the Lexical instance.
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

it('shows count over max', async () => {
  await renderCounter(2048, '<p>hello</p>');
  expect(screen.getByTestId('rich-text-editor-counter')).toHaveTextContent('5 / 2048');
});

it('updates as the user types', async () => {
  await renderCounter(2048);
  typeInto('abc');
  expect(screen.getByTestId('rich-text-editor-counter')).toHaveTextContent('3 / 2048');
});

it('renders nothing when maxLength is not finite', async () => {
  await renderCounter(Infinity);
  expect(screen.queryByTestId('rich-text-editor-counter')).not.toBeInTheDocument();
});
