import React from 'react';
import { render, screen, user, act, waitFor } from 'testing';
import { CAN_UNDO_COMMAND, CAN_REDO_COMMAND, UNDO_COMMAND, REDO_COMMAND } from 'lexical';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { buildInitialConfig } from './helpers';
import HistoryButtons from './HistoryButtons';

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
    <LexicalComposer initialConfig={buildInitialConfig({ initialValue: '<p>hello</p>', disabled: false })}>
      <RichTextPlugin contentEditable={<ContentEditable />} ErrorBoundary={LexicalErrorBoundary} />
      <HistoryPlugin />
      <HistoryButtons disabled={false} {...props} />
    </LexicalComposer>
  );
  await act(async () => {
    await Promise.resolve();
  });
  return utils;
};

const getEditor = () => document.querySelector('[contenteditable="true"]').__lexicalEditor;

const dispatch = (command, payload) =>
  act(() => {
    getEditor().dispatchCommand(command, payload);
  });

const undoButton = () => screen.getByTestId('undo').closest('button');
const redoButton = () => screen.getByTestId('redo').closest('button');

it('disables both buttons before any edit has happened', async () => {
  await renderButtons();
  expect(undoButton()).toBeDisabled();
  expect(redoButton()).toBeDisabled();
});

it('enables the undo button when CAN_UNDO_COMMAND fires true', async () => {
  await renderButtons();
  await dispatch(CAN_UNDO_COMMAND, true);
  await waitFor(() => expect(undoButton()).toBeEnabled());
});

it('re-disables the undo button when CAN_UNDO_COMMAND fires false', async () => {
  await renderButtons();
  await dispatch(CAN_UNDO_COMMAND, true);
  await waitFor(() => expect(undoButton()).toBeEnabled());
  await dispatch(CAN_UNDO_COMMAND, false);
  await waitFor(() => expect(undoButton()).toBeDisabled());
});

it('enables the redo button when CAN_REDO_COMMAND fires true', async () => {
  await renderButtons();
  await dispatch(CAN_REDO_COMMAND, true);
  await waitFor(() => expect(redoButton()).toBeEnabled());
});

it('dispatches UNDO_COMMAND when the undo button is clicked', async () => {
  await renderButtons();
  await dispatch(CAN_UNDO_COMMAND, true);
  await waitFor(() => expect(undoButton()).toBeEnabled());
  const dispatchSpy = jest.spyOn(getEditor(), 'dispatchCommand');
  await user.click(undoButton());
  expect(dispatchSpy).toHaveBeenCalledWith(UNDO_COMMAND, undefined);
  dispatchSpy.mockRestore();
});

it('dispatches REDO_COMMAND when the redo button is clicked', async () => {
  await renderButtons();
  await dispatch(CAN_REDO_COMMAND, true);
  await waitFor(() => expect(redoButton()).toBeEnabled());
  const dispatchSpy = jest.spyOn(getEditor(), 'dispatchCommand');
  await user.click(redoButton());
  expect(dispatchSpy).toHaveBeenCalledWith(REDO_COMMAND, undefined);
  dispatchSpy.mockRestore();
});

it('forces both buttons disabled when the disabled prop is true', async () => {
  await renderButtons({ disabled: true });
  // Even with history available, the explicit disabled prop wins.
  await dispatch(CAN_UNDO_COMMAND, true);
  await dispatch(CAN_REDO_COMMAND, true);
  expect(undoButton()).toBeDisabled();
  expect(redoButton()).toBeDisabled();
});
