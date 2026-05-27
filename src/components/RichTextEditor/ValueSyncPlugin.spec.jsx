import React from 'react';
import { render, act } from 'testing';
import { $getRoot, $createParagraphNode, $createTextNode } from 'lexical';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { buildInitialConfig } from './helpers';
import ValueSyncPlugin from './ValueSyncPlugin';

const Harness = ({ value, onChange }) => (
  <LexicalComposer initialConfig={buildInitialConfig({ value, disabled: false })}>
    <RichTextPlugin contentEditable={<ContentEditable />} ErrorBoundary={LexicalErrorBoundary} />
    <ValueSyncPlugin value={value} onChange={onChange} />
  </LexicalComposer>
);

const flush = () =>
  act(async () => {
    await Promise.resolve();
  });

const getEditor = () => document.querySelector('[contenteditable="true"]').__lexicalEditor;
const getCe = () => document.querySelector('[contenteditable="true"]');

// jsdom cannot simulate contenteditable typing; drive the Lexical instance.
// Appends to the last text node when present (keeping text contiguous), else
// creates one — robust for both seeded and empty editors.
const appendText = (text) =>
  act(() => {
    getEditor().update(
      () => {
        const root = $getRoot();
        let paragraph = root.getLastChild();
        if (paragraph === null) {
          paragraph = $createParagraphNode();
          root.append(paragraph);
        }
        const lastChild = paragraph.getLastChild();
        if (lastChild !== null && lastChild.getType() === 'text') {
          lastChild.setTextContent(lastChild.getTextContent() + text);
        } else {
          paragraph.append($createTextNode(text));
        }
      },
      { discrete: true }
    );
  });

it('emits onChange when the editor content changes', async () => {
  const onChange = jest.fn();
  render(<Harness value="<p>hi</p>" onChange={onChange} />);
  await flush();
  appendText('!');
  expect(onChange).toHaveBeenCalled();
  expect(onChange.mock.calls.at(-1)[0]).toContain('hi!');
});

it('does not emit onChange on mount', async () => {
  const onChange = jest.fn();
  render(<Harness value="<p>seeded</p>" onChange={onChange} />);
  await flush();
  expect(onChange).not.toHaveBeenCalled();
});

it('does nothing harmful when there is no onChange handler', async () => {
  render(<Harness value="<p>hi</p>" onChange={undefined} />);
  await flush();
  expect(() => appendText('!')).not.toThrow();
  expect(getCe()).toHaveTextContent('hi!');
});

it('re-syncs the editor when the value prop changes externally', async () => {
  const onChange = jest.fn();
  const { rerender } = render(<Harness value="<p>first</p>" onChange={onChange} />);
  await flush();
  rerender(<Harness value="<p>second</p>" onChange={onChange} />);
  await flush();
  expect(getCe()).toHaveTextContent('second');
  expect(getCe()).not.toHaveTextContent('first');
});

it('does not emit onChange when value prop is updated externally (controlled sync)', async () => {
  const onChange = jest.fn();
  const { rerender } = render(<Harness value="<p>a</p>" onChange={onChange} />);
  await flush();
  onChange.mockClear();
  rerender(<Harness value="<p>b</p>" onChange={onChange} />);
  await flush();
  expect(onChange).not.toHaveBeenCalled();
});

it('re-syncs to the last emitted value without a further re-sync', async () => {
  const onChange = jest.fn();
  const { rerender } = render(<Harness value="<p>start</p>" onChange={onChange} />);
  await flush();
  appendText('!');
  // Feed the emitted HTML back as the value prop (controlled round-trip).
  const emitted = onChange.mock.calls.at(-1)[0];
  onChange.mockClear();
  rerender(<Harness value={emitted} onChange={onChange} />);
  await flush();
  expect(getCe()).toHaveTextContent('start!');
  expect(onChange).not.toHaveBeenCalled();
});

it('does not re-emit onChange when an update produces identical html', async () => {
  const onChange = jest.fn();
  render(<Harness value="<p>same</p>" onChange={onChange} />);
  await flush();
  appendText('!');
  onChange.mockClear();
  // Rebuild the identical content: the serialized HTML matches the last
  // emitted value, so handleChange must take its no-op early return.
  act(() => {
    getEditor().update(
      () => {
        const root = $getRoot();
        const text = root.getTextContent();
        root.clear();
        const paragraph = $createParagraphNode();
        paragraph.append($createTextNode(text));
        root.append(paragraph);
      },
      { discrete: true }
    );
  });
  expect(onChange).not.toHaveBeenCalled();
});

it('fires onChange when typing into an editor seeded empty', async () => {
  const onChange = jest.fn();
  render(<Harness value="" onChange={onChange} />);
  await flush();
  appendText('first');
  expect(onChange).toHaveBeenCalledWith(expect.stringContaining('first'));
});

it('skips onChange for updates tagged history-merge', async () => {
  const onChange = jest.fn();
  render(<Harness value="<p>x</p>" onChange={onChange} />);
  await flush();
  onChange.mockClear();
  act(() => {
    getEditor().update(
      () => {
        $getRoot().append($createParagraphNode().append($createTextNode('y')));
      },
      { discrete: true, tag: 'history-merge' }
    );
  });
  expect(onChange).not.toHaveBeenCalled();
});

it('still emits onChange for a user edit that immediately follows a controlled sync', async () => {
  const onChange = jest.fn();
  const { rerender } = render(<Harness value="<p>start</p>" onChange={onChange} />);
  await flush();
  onChange.mockClear();
  // Controlled sync (must commit synchronously so the following user edit is a separate commit).
  rerender(<Harness value="<p>synced</p>" onChange={onChange} />);
  await flush();
  // Adjacent untagged user edit — must still fire onChange.
  appendText('!');
  expect(onChange).toHaveBeenCalledTimes(1);
  expect(onChange.mock.lastCall[0]).toContain('synced!');
});
