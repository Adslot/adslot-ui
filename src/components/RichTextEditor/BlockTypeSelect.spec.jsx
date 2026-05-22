import React from 'react';
import { screen, render, user, act } from 'testing';
import { $getRoot } from 'lexical';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { buildInitialConfig } from './helpers';
import BlockTypeSelect from './BlockTypeSelect';

// jsdom does not implement Range.getBoundingClientRect / getClientRects, which
// Lexical calls during editor initialisation.
beforeAll(() => {
  if (!Range.prototype.getBoundingClientRect) {
    Range.prototype.getBoundingClientRect = () => ({
      bottom: 0,
      height: 0,
      left: 0,
      right: 0,
      top: 0,
      width: 0,
      x: 0,
      y: 0,
    });
  }
  if (!Range.prototype.getClientRects) {
    Range.prototype.getClientRects = () => [];
  }
});

// Lexical seeds its initial content and placeholder visibility in a microtask
// after mount; flush it inside act so those updates do not leak past the test.
const renderSelect = async (props = {}) => {
  const utils = render(
    <LexicalComposer initialConfig={buildInitialConfig({ initialValue: '<p>hello</p>', disabled: false })}>
      <RichTextPlugin contentEditable={<ContentEditable />} ErrorBoundary={LexicalErrorBoundary} />
      <ListPlugin />
      <BlockTypeSelect blockType="paragraph" disabled={false} {...props} />
    </LexicalComposer>
  );
  await act(async () => {
    await Promise.resolve();
  });
  return utils;
};

// Establishes a range selection at the end of the first block so that
// applyBlockType exercises the already-has-selection branch.
const selectEditorContent = () =>
  act(() => {
    document
      .querySelector('[contenteditable]')
      .__lexicalEditor.update(() => $getRoot().getFirstChild().selectEnd(), { discrete: true });
  });

it('renders the current block type as its value', async () => {
  await renderSelect({ blockType: 'h1' });
  expect(screen.getByTestId('rich-text-editor-block-type')).toHaveValue('h1');
});

it('offers all eight block options', async () => {
  await renderSelect();
  const select = screen.getByTestId('rich-text-editor-block-type');
  ['paragraph', 'h1', 'h2', 'h3', 'bullet', 'number', 'quote', 'code'].forEach((value) => {
    expect(select.querySelector(`option[value="${value}"]`)).not.toBeNull();
  });
});

it('applies a heading when chosen', async () => {
  await renderSelect();
  await user.selectOptions(screen.getByTestId('rich-text-editor-block-type'), 'h2');
  expect(document.querySelector('.aui--editor-heading-h2')).not.toBeNull();
});

it('applies a bullet list when chosen', async () => {
  await renderSelect();
  await user.selectOptions(screen.getByTestId('rich-text-editor-block-type'), 'bullet');
  expect(document.querySelector('ul')).not.toBeNull();
});

it('applies a quote when chosen', async () => {
  await renderSelect();
  await user.selectOptions(screen.getByTestId('rich-text-editor-block-type'), 'quote');
  expect(document.querySelector('.aui--editor-quote')).not.toBeNull();
});

it('applies a code block when chosen', async () => {
  await renderSelect();
  await selectEditorContent();
  await user.selectOptions(screen.getByTestId('rich-text-editor-block-type'), 'code');
  expect(document.querySelector('.aui--editor-code')).not.toBeNull();
});

it('switches from a list back to normal', async () => {
  await renderSelect({ blockType: 'bullet' });
  await user.selectOptions(screen.getByTestId('rich-text-editor-block-type'), 'paragraph');
  expect(document.querySelector('ul')).toBeNull();
});

it('does nothing when the chosen type equals the current type', async () => {
  await renderSelect({ blockType: 'paragraph' });
  await user.selectOptions(screen.getByTestId('rich-text-editor-block-type'), 'paragraph');
  expect(document.querySelector('.aui--editor-heading-h1')).toBeNull();
});

it('is disabled when disabled is true', async () => {
  await renderSelect({ disabled: true });
  expect(screen.getByTestId('rich-text-editor-block-type')).toBeDisabled();
});

it('applies a numbered list when there is an existing selection', async () => {
  await renderSelect();
  await selectEditorContent();
  await user.selectOptions(screen.getByTestId('rich-text-editor-block-type'), 'number');
  expect(document.querySelector('ol')).not.toBeNull();
});

it('applies a heading when there is an existing selection', async () => {
  await renderSelect();
  await selectEditorContent();
  await user.selectOptions(screen.getByTestId('rich-text-editor-block-type'), 'h3');
  expect(document.querySelector('.aui--editor-heading-h3')).not.toBeNull();
});
