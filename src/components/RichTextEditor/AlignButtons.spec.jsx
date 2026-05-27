import React from 'react';
import { render, screen, user, act } from 'testing';
import { $getRoot } from 'lexical';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { buildInitialConfig } from './helpers';
import AlignButtons from './AlignButtons';

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
      <AlignButtons alignment={null} disabled={false} {...props} />
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

it('renders one button per alignment', async () => {
  await renderButtons();
  expect(screen.getByTestId('align-left')).toBeInTheDocument();
  expect(screen.getByTestId('align-center')).toBeInTheDocument();
  expect(screen.getByTestId('align-right')).toBeInTheDocument();
  expect(screen.getByTestId('align-justify')).toBeInTheDocument();
});

it('marks the active alignment with the .active class', async () => {
  await renderButtons({ alignment: 'center' });
  expect(screen.getByTestId('align-center').closest('button')).toHaveClass('active');
  expect(screen.getByTestId('align-left').closest('button')).not.toHaveClass('active');
});

it('applies center alignment to the selected block', async () => {
  await renderButtons();
  await selectEditorContent();
  await user.click(screen.getByTestId('align-center').closest('button'));
  expect(document.querySelector('[style*="text-align: center"]')).not.toBeNull();
});

it('applies justify alignment when clicked', async () => {
  await renderButtons();
  await selectEditorContent();
  await user.click(screen.getByTestId('align-justify').closest('button'));
  expect(document.querySelector('[style*="text-align: justify"]')).not.toBeNull();
});

it('disables every button when disabled is true', async () => {
  await renderButtons({ disabled: true });
  ['align-left', 'align-center', 'align-right', 'align-justify'].forEach((id) => {
    expect(screen.getByTestId(id).closest('button')).toBeDisabled();
  });
});
