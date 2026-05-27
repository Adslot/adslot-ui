import React from 'react';
import { render, screen, user, act } from 'testing';
import { $getRoot } from 'lexical';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { buildInitialConfig } from './helpers';
import IndentButtons from './IndentButtons';

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

const renderButtons = async (props = {}) => {
  const utils = render(
    <LexicalComposer
      initialConfig={buildInitialConfig({ initialValue: '<ul><li>first</li><li>second</li></ul>', disabled: false })}
    >
      <RichTextPlugin contentEditable={<ContentEditable />} ErrorBoundary={LexicalErrorBoundary} />
      <ListPlugin />
      <IndentButtons disabled={false} {...props} />
    </LexicalComposer>
  );
  await act(async () => {
    await Promise.resolve();
  });
  return utils;
};

const selectLastListItem = () =>
  act(() => {
    document.querySelector('[contenteditable]').__lexicalEditor.update(
      () => {
        const root = $getRoot();
        const list = root.getFirstChild();
        const items = list.getChildren();
        items[items.length - 1].selectEnd();
      },
      { discrete: true }
    );
  });

it('renders an indent and outdent button', async () => {
  await renderButtons();
  expect(screen.getByTestId('indent')).toBeInTheDocument();
  expect(screen.getByTestId('outdent')).toBeInTheDocument();
});

it('nests the list item under its predecessor when indent is clicked', async () => {
  await renderButtons();
  await selectLastListItem();
  await user.click(screen.getByTestId('indent').closest('button'));
  // Indent should produce a nested <ul> inside the previous <li>.
  expect(document.querySelector('ul ul, ul li ul')).not.toBeNull();
});

it('lifts the nested list item back out when outdent is clicked', async () => {
  await renderButtons();
  await selectLastListItem();
  await user.click(screen.getByTestId('indent').closest('button'));
  await user.click(screen.getByTestId('outdent').closest('button'));
  expect(document.querySelector('ul ul, ul li ul')).toBeNull();
});

it('disables both buttons when disabled is true', async () => {
  await renderButtons({ disabled: true });
  expect(screen.getByTestId('indent').closest('button')).toBeDisabled();
  expect(screen.getByTestId('outdent').closest('button')).toBeDisabled();
});
