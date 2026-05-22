import React from 'react';
import { render, act, fireEvent } from 'testing';
import { $getRoot } from 'lexical';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { buildInitialConfig } from './helpers';
import PlainTextPastePlugin from './PlainTextPastePlugin';

// jsdom defines neither DragEvent nor ClipboardEvent; @lexical/rich-text's
// paste handler probes both via `instanceof` when no plugin claims the paste,
// which crashes the deferred-paste test below. Minimal Event subclasses
// satisfy the checks.
if (typeof globalThis.DragEvent === 'undefined') {
  globalThis.DragEvent = class DragEvent extends Event {};
}
if (typeof globalThis.ClipboardEvent === 'undefined') {
  globalThis.ClipboardEvent = class ClipboardEvent extends Event {};
}

const renderPaste = async () => {
  const utils = render(
    <LexicalComposer initialConfig={buildInitialConfig({ initialValue: '', disabled: false })}>
      <RichTextPlugin contentEditable={<ContentEditable />} ErrorBoundary={LexicalErrorBoundary} />
      <PlainTextPastePlugin />
    </LexicalComposer>
  );
  await act(async () => {
    await Promise.resolve();
  });
  return utils;
};

const getEditor = () => document.querySelector('[contenteditable="true"]').__lexicalEditor;

it('lets the browser handle paste when there is no range selection', async () => {
  await renderPaste();
  // No selection has been placed — $getSelection() returns null in jsdom, so
  // the handler returns false without calling preventDefault.
  const ce = document.querySelector('[contenteditable="true"]');
  const event = new Event('paste', { bubbles: true, cancelable: true });
  event.clipboardData = {
    getData: () => 'ignored',
    types: ['text/plain'],
  };
  fireEvent(ce, event);
  await act(async () => {
    await Promise.resolve();
  });
  expect(event.defaultPrevented).toBe(false);
});

it('inserts pasted content as plain text, discarding formatting', async () => {
  await renderPaste();
  // A range selection must exist for the paste handler to take over.
  act(() => {
    getEditor().update(
      () => {
        $getRoot().selectStart();
      },
      { discrete: true }
    );
  });
  const ce = document.querySelector('[contenteditable="true"]');
  fireEvent.paste(ce, {
    clipboardData: {
      getData: (type) => (type === 'text/plain' ? 'plain words' : '<strong>plain words</strong>'),
      types: ['text/plain', 'text/html'],
    },
  });
  await act(async () => {
    await Promise.resolve();
  });
  expect(ce.querySelector('strong')).toBeNull();
  expect(ce).toHaveTextContent('plain words');
});
