import React from 'react';
import { render, screen, act } from 'testing';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { CAN_UNDO_COMMAND, CAN_REDO_COMMAND } from 'lexical';
import { buildInitialConfig } from './helpers';
import useHistoryState from './useHistoryState';

const Probe = () => {
  const { canUndo, canRedo } = useHistoryState();
  return <div data-testid="probe">{`${canUndo}:${canRedo}`}</div>;
};

// Helper that provides a ref to the editor instance so tests can dispatch
// commands directly, bypassing the HistoryPlugin timer delay.
const EditorRef = React.forwardRef((_props, ref) => {
  const [editor] = useLexicalComposerContext();
  React.useImperativeHandle(ref, () => editor, [editor]);
  return null;
});
EditorRef.displayName = 'EditorRef';

const renderProbe = () => {
  const editorRef = React.createRef();
  const utils = render(
    <LexicalComposer initialConfig={buildInitialConfig({ initialValue: '', disabled: false })}>
      <RichTextPlugin contentEditable={<ContentEditable />} ErrorBoundary={LexicalErrorBoundary} />
      <HistoryPlugin />
      <EditorRef ref={editorRef} />
      <Probe />
    </LexicalComposer>
  );
  const dispatchCommand = (cmd, payload) =>
    act(() => {
      editorRef.current.dispatchCommand(cmd, payload);
    });
  return { ...utils, dispatchCommand };
};

it('starts with undo and redo disabled', async () => {
  renderProbe();
  await act(async () => {
    await Promise.resolve();
  });
  expect(screen.getByTestId('probe')).toHaveTextContent('false:false');
});

it('enables undo after a content change', async () => {
  // Dispatch CAN_UNDO_COMMAND directly; in production this is emitted by
  // HistoryPlugin after each editor update. We test the hook's reaction to
  // the command, not HistoryPlugin itself.
  const { dispatchCommand } = renderProbe();
  await act(async () => {
    await Promise.resolve();
  });
  dispatchCommand(CAN_UNDO_COMMAND, true);
  expect(screen.getByTestId('probe')).toHaveTextContent('true:false');
});

it('enables redo when CAN_REDO_COMMAND fires', async () => {
  const { dispatchCommand } = renderProbe();
  await act(async () => {
    await Promise.resolve();
  });
  dispatchCommand(CAN_REDO_COMMAND, true);
  expect(screen.getByTestId('probe')).toHaveTextContent('false:true');
});
