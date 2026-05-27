import React from 'react';
import { render, screen, user, act, fireEvent } from 'testing';
import { $getRoot } from 'lexical';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { buildInitialConfig } from './helpers';
import AlignAction from './AlignAction';

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

const renderAction = async (props = {}) => {
  const utils = render(
    <LexicalComposer initialConfig={buildInitialConfig({ initialValue: '<p>hello</p>', disabled: false })}>
      <RichTextPlugin contentEditable={<ContentEditable />} ErrorBoundary={LexicalErrorBoundary} />
      <AlignAction alignment={null} disabled={false} {...props} />
    </LexicalComposer>
  );
  await act(async () => {
    await Promise.resolve();
  });
  return utils;
};

const selectEditorContent = () =>
  act(() => {
    document
      .querySelector('[contenteditable]')
      .__lexicalEditor.update(() => $getRoot().getFirstChild().selectEnd(), { discrete: true });
  });

const alignButton = () => screen.getByTestId('align').closest('button');

it('renders a single toolbar button by default', async () => {
  await renderAction();
  expect(alignButton()).toBeInTheDocument();
  expect(screen.queryByTestId('align-popover')).not.toBeInTheDocument();
});

it('opens the popover with four alignment options on click', async () => {
  await renderAction();
  await user.click(alignButton());
  expect(screen.getByTestId('align-popover')).toBeInTheDocument();
  ['align-left', 'align-center', 'align-right', 'align-justify'].forEach((id) => {
    expect(screen.getByTestId(id)).toBeInTheDocument();
  });
});

it('shows the current alignment icon on the trigger button', async () => {
  await renderAction({ alignment: 'center' });
  expect(screen.getByTestId('align')).toHaveClass('align-center-icon');
});

it('falls back to the left icon when alignment is null', async () => {
  await renderAction({ alignment: null });
  expect(screen.getByTestId('align')).toHaveClass('align-left-icon');
});

it('falls back to the left icon when alignment is an unrecognised value', async () => {
  await renderAction({ alignment: 'start' });
  expect(screen.getByTestId('align')).toHaveClass('align-left-icon');
});

it('applies the chosen alignment to the selection and closes the popover', async () => {
  await renderAction();
  await selectEditorContent();
  await user.click(alignButton());
  await user.click(screen.getByTestId('align-center').closest('button'));
  expect(document.querySelector('[style*="text-align: center"]')).toBeInTheDocument();
  expect(screen.queryByTestId('align-popover')).not.toBeInTheDocument();
});

it('marks the active alignment inside the popover', async () => {
  await renderAction({ alignment: 'right' });
  await user.click(alignButton());
  expect(screen.getByTestId('align-right').closest('button')).toHaveClass('active');
  expect(screen.getByTestId('align-left').closest('button')).not.toHaveClass('active');
});

it('closes on Escape', async () => {
  await renderAction();
  await user.click(alignButton());
  fireEvent.keyDown(document, { key: 'Escape' });
  expect(screen.queryByTestId('align-popover')).not.toBeInTheDocument();
});

it('closes on outside mousedown', async () => {
  await renderAction();
  await user.click(alignButton());
  fireEvent.mouseDown(document.body);
  expect(screen.queryByTestId('align-popover')).not.toBeInTheDocument();
});

it('keeps the popover open when clicking inside the popover container', async () => {
  await renderAction();
  await user.click(alignButton());
  fireEvent.mouseDown(screen.getByTestId('align-popover'));
  expect(screen.getByTestId('align-popover')).toBeInTheDocument();
});

it('toggles the popover closed when the trigger is clicked twice', async () => {
  await renderAction();
  await user.click(alignButton());
  await user.click(alignButton());
  expect(screen.queryByTestId('align-popover')).not.toBeInTheDocument();
});

it('is disabled when disabled is true', async () => {
  await renderAction({ disabled: true });
  expect(alignButton()).toBeDisabled();
});

it('exposes a hover tooltip via the data-tooltip attribute', async () => {
  await renderAction();
  expect(alignButton()).toHaveAttribute('data-tooltip', 'Alignment');
});

it('marks the trigger active when a non-default alignment is set, even with popover closed', async () => {
  await renderAction({ alignment: 'center' });
  expect(alignButton()).toHaveClass('active');
  expect(screen.queryByTestId('align-popover')).not.toBeInTheDocument();
});

it('does not mark the trigger active when alignment is null and the popover is closed', async () => {
  await renderAction({ alignment: null });
  expect(alignButton()).not.toHaveClass('active');
});
