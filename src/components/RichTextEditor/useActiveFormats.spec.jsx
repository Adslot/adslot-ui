import React from 'react';
import { render, screen, act } from 'testing';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { $getRoot } from 'lexical';
import { buildInitialConfig } from './helpers';
import useActiveFormats from './useActiveFormats';

const Probe = () => {
  const formats = useActiveFormats();
  return (
    <div
      data-testid="probe"
      data-block-type={formats.blockType}
      data-is-link={String(formats.isLink)}
      data-link-url={formats.linkUrl}
      data-strikethrough={String(formats.strikethrough)}
      data-code={String(formats.code)}
    >
      {formats.blockType}
    </div>
  );
};

const renderWith = async (initialValue) => {
  render(
    <LexicalComposer initialConfig={buildInitialConfig({ initialValue, disabled: false })}>
      <RichTextPlugin contentEditable={<ContentEditable />} ErrorBoundary={LexicalErrorBoundary} />
      <ListPlugin />
      <Probe />
    </LexicalComposer>
  );
  await act(async () => {
    await Promise.resolve();
  });
  // Place a range selection at the end of the first block so $resolveBlockType
  // walks from a real anchor rather than the empty default.
  act(() => {
    document
      .querySelector('[contenteditable]')
      .__lexicalEditor.update(() => $getRoot().getFirstChild().selectEnd(), { discrete: true });
  });
  await act(async () => {
    await Promise.resolve();
  });
};

it('resolves blockType to the heading tag when the selection is inside a heading', async () => {
  await renderWith('<h2>title</h2>');
  expect(screen.getByTestId('probe')).toHaveTextContent('h2');
});

it('resolves blockType to "quote" when the selection is inside a blockquote', async () => {
  await renderWith('<blockquote>cited</blockquote>');
  expect(screen.getByTestId('probe')).toHaveTextContent('quote');
});

it('resolves blockType to "bullet" / "number" when the selection is inside a list', async () => {
  await renderWith('<ul><li>one</li></ul>');
  expect(screen.getByTestId('probe')).toHaveTextContent('bullet');
});

it('resolves blockType to "number" for an ordered list', async () => {
  await renderWith('<ol><li>one</li></ol>');
  expect(screen.getByTestId('probe')).toHaveTextContent('number');
});

// The top-level block is the blockquote, so $blockOf returns a non-list element
// and the resolver falls back to $getNearestNodeOfType to find the enclosing list.
it('resolves blockType via the nearest-list fallback when an ordered list is nested inside a quote', async () => {
  await renderWith('<blockquote><ol><li>one</li></ol></blockquote>');
  expect(screen.getByTestId('probe')).toHaveTextContent('number');
});

it('resolves blockType via the nearest-list fallback when an unordered list is nested inside a quote', async () => {
  await renderWith('<blockquote><ul><li>one</li></ul></blockquote>');
  expect(screen.getByTestId('probe')).toHaveTextContent('bullet');
});

it('reports isLink and linkUrl when the selection is inside an anchor', async () => {
  await renderWith('<p><a href="https://adslot.com">hello</a></p>');
  expect(screen.getByTestId('probe')).toHaveAttribute('data-is-link', 'true');
  expect(screen.getByTestId('probe')).toHaveAttribute('data-link-url', 'https://adslot.com');
});

it('reports isLink=false and linkUrl="" when the selection is outside any anchor', async () => {
  await renderWith('<p>plain text</p>');
  expect(screen.getByTestId('probe')).toHaveAttribute('data-is-link', 'false');
  expect(screen.getByTestId('probe')).toHaveAttribute('data-link-url', '');
});

it('reports strikethrough=false and code=false on plain text', async () => {
  await renderWith('<p>plain</p>');
  expect(screen.getByTestId('probe')).toHaveAttribute('data-strikethrough', 'false');
  expect(screen.getByTestId('probe')).toHaveAttribute('data-code', 'false');
});

it('resolves blockType to "code" when the selection is inside a code block', async () => {
  await renderWith('<pre><code>const x = 1;</code></pre>');
  expect(screen.getByTestId('probe')).toHaveTextContent('code');
});
