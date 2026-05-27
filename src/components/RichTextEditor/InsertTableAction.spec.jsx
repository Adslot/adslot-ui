import React from 'react';
import { render, screen, user, act, fireEvent, waitFor } from 'testing';
import { $getRoot } from 'lexical';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { TablePlugin } from '@lexical/react/LexicalTablePlugin';
import { buildInitialConfig } from './helpers';
import InsertTableAction from './InsertTableAction';

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
      <TablePlugin />
      <InsertTableAction disabled={false} {...props} />
    </LexicalComposer>
  );
  await act(async () => {
    await Promise.resolve();
  });
  return utils;
};

const placeCaretAtEnd = () =>
  act(() => {
    document
      .querySelector('[contenteditable]')
      .__lexicalEditor.update(() => $getRoot().getFirstChild().selectEnd(), { discrete: true });
  });

it('opens the popover when the toolbar button is clicked', async () => {
  await renderAction();
  expect(screen.queryByTestId('insert-table-popover')).not.toBeInTheDocument();
  await user.click(screen.getByTestId('insert-table').closest('button'));
  expect(screen.getByTestId('insert-table-popover')).toBeInTheDocument();
});

it('inserts a table with the chosen dimensions', async () => {
  await renderAction();
  await placeCaretAtEnd();
  await user.click(screen.getByTestId('insert-table').closest('button'));
  fireEvent.change(screen.getByTestId('insert-table-rows'), { target: { value: '2' } });
  fireEvent.change(screen.getByTestId('insert-table-columns'), { target: { value: '3' } });
  await user.click(screen.getByTestId('insert-table-submit'));
  const tables = document.querySelectorAll('table');
  expect(tables.length).toBeGreaterThan(0);
  const rows = document.querySelectorAll('table tr');
  const cells = document.querySelectorAll('table tr:first-of-type td, table tr:first-of-type th');
  expect(rows.length).toBe(2);
  expect(cells.length).toBe(3);
});

it('clamps oversized row + column inputs to the maximum', async () => {
  await renderAction();
  await placeCaretAtEnd();
  await user.click(screen.getByTestId('insert-table').closest('button'));
  fireEvent.change(screen.getByTestId('insert-table-rows'), { target: { value: '500' } });
  fireEvent.change(screen.getByTestId('insert-table-columns'), { target: { value: '500' } });
  await user.click(screen.getByTestId('insert-table-submit'));
  const rows = document.querySelectorAll('table tr');
  const cells = document.querySelectorAll('table tr:first-of-type td, table tr:first-of-type th');
  expect(rows.length).toBe(20);
  expect(cells.length).toBe(10);
});

it('falls back to the defaults when the inputs are non-numeric', async () => {
  await renderAction();
  await placeCaretAtEnd();
  await user.click(screen.getByTestId('insert-table').closest('button'));
  fireEvent.change(screen.getByTestId('insert-table-rows'), { target: { value: '' } });
  fireEvent.change(screen.getByTestId('insert-table-columns'), { target: { value: '' } });
  await user.click(screen.getByTestId('insert-table-submit'));
  expect(document.querySelectorAll('table tr').length).toBe(3);
  expect(document.querySelectorAll('table tr:first-of-type td, table tr:first-of-type th').length).toBe(3);
});

it('closes the popover when Cancel is clicked', async () => {
  await renderAction();
  await user.click(screen.getByTestId('insert-table').closest('button'));
  await user.click(screen.getByTestId('insert-table-cancel'));
  expect(screen.queryByTestId('insert-table-popover')).not.toBeInTheDocument();
});

it('closes the popover when Escape is pressed', async () => {
  await renderAction();
  await user.click(screen.getByTestId('insert-table').closest('button'));
  fireEvent.keyDown(document, { key: 'Escape' });
  expect(screen.queryByTestId('insert-table-popover')).not.toBeInTheDocument();
});

it('closes the popover on outside mousedown', async () => {
  await renderAction();
  await user.click(screen.getByTestId('insert-table').closest('button'));
  fireEvent.mouseDown(document.body);
  expect(screen.queryByTestId('insert-table-popover')).not.toBeInTheDocument();
});

it('closes the popover when the toolbar button is clicked again', async () => {
  await renderAction();
  await user.click(screen.getByTestId('insert-table').closest('button'));
  await user.click(screen.getByTestId('insert-table').closest('button'));
  expect(screen.queryByTestId('insert-table-popover')).not.toBeInTheDocument();
});

it('is disabled when disabled is true', async () => {
  await renderAction({ disabled: true });
  expect(screen.getByTestId('insert-table').closest('button')).toBeDisabled();
});

it('submits when the form receives a submit event (Enter key path)', async () => {
  await renderAction();
  await placeCaretAtEnd();
  await user.click(screen.getByTestId('insert-table').closest('button'));
  fireEvent.change(screen.getByTestId('insert-table-rows'), { target: { value: '2' } });
  fireEvent.change(screen.getByTestId('insert-table-columns'), { target: { value: '2' } });
  fireEvent.submit(screen.getByTestId('insert-table-popover').querySelector('form'));
  await waitFor(() => expect(document.querySelectorAll('table tr')).toHaveLength(2));
  expect(screen.queryByTestId('insert-table-popover')).not.toBeInTheDocument();
});

it('focuses and selects the rows input when the popover opens', async () => {
  await renderAction();
  await user.click(screen.getByTestId('insert-table').closest('button'));
  expect(screen.getByTestId('insert-table-rows')).toHaveFocus();
});

it('closes the popover without crashing when no editor selection was placed first', async () => {
  await renderAction();
  // Skip placeCaretAtEnd — savedSelection.current stays null and Lexical's
  // INSERT_TABLE_COMMAND no-ops on missing selection. The action must still
  // close the popover and not throw.
  await user.click(screen.getByTestId('insert-table').closest('button'));
  await user.click(screen.getByTestId('insert-table-submit'));
  expect(screen.queryByTestId('insert-table-popover')).not.toBeInTheDocument();
});
