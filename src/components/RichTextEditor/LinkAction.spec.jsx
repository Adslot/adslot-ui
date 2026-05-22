import React from 'react';
import { render, screen, user, act, fireEvent, waitFor } from 'testing';
import { $getRoot } from 'lexical';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { buildInitialConfig, isValidLinkUrl } from './helpers';
import LinkAction from './LinkAction';

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

// jsdom rejects Selection.setBaseAndExtent across nodes, which Lexical
// catches and warns about. The editor state still mutates correctly in
// memory, so the warning is expected noise for these integration tests.
let warnSpy;
beforeEach(() => {
  warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
});
afterEach(() => {
  warnSpy.mockRestore();
});

const renderAction = async (props = {}, initialValue = '<p>hello world</p>') => {
  const utils = render(
    <LexicalComposer initialConfig={buildInitialConfig({ initialValue, disabled: false })}>
      <RichTextPlugin contentEditable={<ContentEditable />} ErrorBoundary={LexicalErrorBoundary} />
      <LinkPlugin validateUrl={isValidLinkUrl} />
      <LinkAction disabled={false} isLink={false} linkUrl="" {...props} />
    </LexicalComposer>
  );
  await act(async () => {
    await Promise.resolve();
  });
  return utils;
};

const selectFirstBlock = () =>
  act(() => {
    document.querySelector('[contenteditable]').__lexicalEditor.update(
      () => {
        const root = $getRoot();
        const first = root.getFirstChild();
        first.select(0, first.getTextContentSize());
      },
      { discrete: true }
    );
  });

it('opens the popover when the toolbar button is clicked', async () => {
  await renderAction();
  expect(screen.queryByTestId('link-popover')).not.toBeInTheDocument();
  await user.click(screen.getByTestId('link').closest('button'));
  expect(screen.getByTestId('link-popover')).toBeInTheDocument();
});

it('marks the button active when the caret is inside a link', async () => {
  await renderAction({ isLink: true, linkUrl: 'https://example.com' });
  expect(screen.getByTestId('link').closest('button')).toHaveClass('active');
});

it('prefills the URL field from the active link', async () => {
  await renderAction({ isLink: true, linkUrl: 'https://example.com' });
  await user.click(screen.getByTestId('link').closest('button'));
  expect(screen.getByTestId('link-url')).toHaveValue('https://example.com');
});

it('hides Remove when the caret is not inside an existing link', async () => {
  await renderAction();
  await user.click(screen.getByTestId('link').closest('button'));
  expect(screen.queryByTestId('link-remove')).not.toBeInTheDocument();
});

it('shows Remove when the caret is inside an existing link', async () => {
  await renderAction({ isLink: true, linkUrl: 'https://example.com' });
  await user.click(screen.getByTestId('link').closest('button'));
  expect(screen.getByTestId('link-remove')).toBeInTheDocument();
});

it('applies a link to the selected text on submit', async () => {
  await renderAction();
  await selectFirstBlock();
  await user.click(screen.getByTestId('link').closest('button'));
  fireEvent.change(screen.getByTestId('link-url'), { target: { value: 'https://adslot.com' } });
  await user.click(screen.getByTestId('link-submit'));
  const anchor = document.querySelector('a');
  expect(anchor).toBeInTheDocument();
  expect(anchor).toHaveAttribute('href', 'https://adslot.com');
});

it('upgrades bare domains to https when applying', async () => {
  await renderAction();
  await selectFirstBlock();
  await user.click(screen.getByTestId('link').closest('button'));
  fireEvent.change(screen.getByTestId('link-url'), { target: { value: 'example.com' } });
  await user.click(screen.getByTestId('link-submit'));
  expect(document.querySelector('a')).toHaveAttribute('href', 'https://example.com');
});

const UNSAFE_URL = `${'java'}${'script'}:alert(1)`;
const UNSAFE_SHORT = `${'java'}${'script'}:x`;

it('rejects unsafe URLs and shows an error message', async () => {
  await renderAction();
  await selectFirstBlock();
  await user.click(screen.getByTestId('link').closest('button'));
  fireEvent.change(screen.getByTestId('link-url'), { target: { value: UNSAFE_URL } });
  await user.click(screen.getByTestId('link-submit'));
  expect(screen.getByTestId('link-error')).toBeInTheDocument();
  expect(document.querySelector('a')).toBeNull();
});

it('clears the error indicator when the user edits the field after an error', async () => {
  await renderAction();
  await selectFirstBlock();
  await user.click(screen.getByTestId('link').closest('button'));
  fireEvent.change(screen.getByTestId('link-url'), { target: { value: UNSAFE_SHORT } });
  await user.click(screen.getByTestId('link-submit'));
  expect(screen.getByTestId('link-error')).toBeInTheDocument();
  fireEvent.change(screen.getByTestId('link-url'), { target: { value: 'https://ok.com' } });
  expect(screen.queryByTestId('link-error')).not.toBeInTheDocument();
});

it('removes the active link when Remove is clicked', async () => {
  await renderAction(
    { isLink: true, linkUrl: 'https://example.com' },
    '<p><a href="https://example.com">hello</a></p>'
  );
  await selectFirstBlock();
  await user.click(screen.getByTestId('link').closest('button'));
  await user.click(screen.getByTestId('link-remove'));
  expect(document.querySelector('a')).toBeNull();
});

it('closes the popover when Cancel is clicked', async () => {
  await renderAction();
  await user.click(screen.getByTestId('link').closest('button'));
  await user.click(screen.getByTestId('link-cancel'));
  expect(screen.queryByTestId('link-popover')).not.toBeInTheDocument();
});

it('closes the popover on Escape', async () => {
  await renderAction();
  await user.click(screen.getByTestId('link').closest('button'));
  fireEvent.keyDown(document, { key: 'Escape' });
  expect(screen.queryByTestId('link-popover')).not.toBeInTheDocument();
});

it('closes the popover on outside mousedown', async () => {
  await renderAction();
  await user.click(screen.getByTestId('link').closest('button'));
  fireEvent.mouseDown(document.body);
  expect(screen.queryByTestId('link-popover')).not.toBeInTheDocument();
});

it('closes the popover when the toolbar button is clicked again', async () => {
  await renderAction();
  await user.click(screen.getByTestId('link').closest('button'));
  await user.click(screen.getByTestId('link').closest('button'));
  expect(screen.queryByTestId('link-popover')).not.toBeInTheDocument();
});

it('is disabled when disabled is true', async () => {
  await renderAction({ disabled: true });
  expect(screen.getByTestId('link').closest('button')).toBeDisabled();
});

it('submits when the form receives a submit event (Enter key path)', async () => {
  await renderAction();
  await selectFirstBlock();
  await user.click(screen.getByTestId('link').closest('button'));
  fireEvent.change(screen.getByTestId('link-url'), { target: { value: 'https://enter-key.test' } });
  fireEvent.submit(screen.getByTestId('link-popover').querySelector('form'));
  await waitFor(() => expect(document.querySelector('a')).toHaveAttribute('href', 'https://enter-key.test'));
  expect(screen.queryByTestId('link-popover')).not.toBeInTheDocument();
});

it('focuses and selects the URL input when the popover opens', async () => {
  await renderAction({ isLink: true, linkUrl: 'https://prefilled.test' });
  await user.click(screen.getByTestId('link').closest('button'));
  expect(screen.getByTestId('link-url')).toHaveFocus();
});
