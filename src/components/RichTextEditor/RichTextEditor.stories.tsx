import React, { useRef, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import RichTextEditor from './index';

const meta = {
  title: 'Pending Review/RichTextEditor',
  component: RichTextEditor,
  tags: ['autodocs'],
} satisfies Meta<typeof RichTextEditor>;

export default meta;

type Story = StoryObj<typeof meta>;

const SAMPLE_MENTIONS = [
  { name: 'Ada Lovelace', title: 'Mathematician', avatar: 'https://i.pravatar.cc/40?img=1' },
  { name: 'Alan Turing', title: 'Computer Scientist', avatar: 'https://i.pravatar.cc/40?img=2' },
  { name: 'Grace Hopper', title: 'Rear Admiral', avatar: 'https://i.pravatar.cc/40?img=3' },
  { name: 'Linus Torvalds', title: 'Engineer', avatar: 'https://i.pravatar.cc/40?img=4' },
  { name: 'Margaret Hamilton', title: 'Software Engineer', avatar: 'https://i.pravatar.cc/40?img=5' },
];

export const Default: Story = {
  args: { placeholder: 'Tell a story… the toolbar covers history, block types, inline formats, alignment, indent, links, and tables.' },
};

export const WithInitialValue: Story = {
  args: {
    initialValue:
      '<p>This editor was seeded with <strong>bold</strong>, <em>italic</em> and <u>underlined</u> text.</p>' +
      '<ul><li>a bullet point</li><li>another one</li></ul>' +
      '<ol><li>a numbered point</li></ol>',
  },
};

export const HeadingsAndQuote: Story = {
  args: {
    initialValue:
      '<h1>Heading 1</h1>' +
      '<h2>Heading 2</h2>' +
      '<h3>Heading 3</h3>' +
      '<p>A regular paragraph between blocks.</p>' +
      '<blockquote>A quoted line — pick "Quote" from the block-type dropdown to convert a paragraph.</blockquote>',
  },
};

export const Lists: Story = {
  args: {
    initialValue:
      '<p>Pick <em>Bullet List</em> or <em>Numbered List</em> in the block-type dropdown to convert a paragraph.</p>' +
      '<ul><li>First bullet<ul><li>Nested bullet</li></ul></li><li>Second bullet</li></ul>' +
      '<ol><li>First numbered item</li><li>Second numbered item</li></ol>',
  },
};

export const LinksAndAutoLink: Story = {
  args: {
    initialValue:
      '<p>Imported links survive serialisation: <a href="https://www.adslot.com">visit adslot.com</a>.</p>' +
      '<p>Type a bare URL like https://example.com or an email like hello@example.com and it will auto-link on the next space.</p>' +
      '<p>Or select text and click the toolbar link button to open the URL popover.</p>',
  },
};

export const WithLink: Story = {
  args: {
    initialValue:
      '<p>Click inside <a href="https://www.adslot.com">this existing link</a> — the toolbar link button activates and the popover prefills the URL.</p>' +
      '<p>Select any plain text below to add a new link via the toolbar.</p>' +
      '<p>The whole quick brown fox jumps over the lazy dog.</p>',
  },
};

export const WithStrikethroughAndCode: Story = {
  args: {
    initialValue:
      '<p>Use the toolbar to toggle <s>strikethrough</s> or inline <code>code()</code> on the selected text.</p>' +
      '<p>Both round-trip through the serialised HTML.</p>',
  },
};

export const WithCodeBlock: Story = {
  args: {
    initialValue:
      '<p>Pick <em>Code Block</em> from the block-type dropdown to turn the current paragraph into a multi-line code block.</p>' +
      '<pre><code>function greet(name) {\n  return "Hello, " + name + "!";\n}</code></pre>' +
      '<p>Or use the markdown shortcut: type three backticks followed by Enter.</p>',
  },
};

export const WithAlignment: Story = {
  args: {
    initialValue:
      '<p style="text-align: left">Left-aligned (default).</p>' +
      '<p style="text-align: center">Center-aligned.</p>' +
      '<p style="text-align: right">Right-aligned.</p>' +
      '<p style="text-align: justify">Justified — pad the right edge by extending this paragraph with enough text to wrap onto a second line so the justification can take visible effect.</p>',
  },
};

export const MarkdownShortcuts: Story = {
  args: {
    placeholder:
      'Try: # heading, > quote, - bullet, 1. numbered, **bold**, *italic*, [link](https://example.com)',
  },
};

export const Table: Story = {
  args: {
    initialValue:
      '<p>Tables imported via HTML render and remain editable. Click the toolbar table button to insert a new table at the caret.</p>' +
      '<table><tr><th>Name</th><th>Role</th></tr><tr><td>Ada</td><td>Mathematician</td></tr><tr><td>Alan</td><td>Computer Scientist</td></tr></table>',
  },
};

export const WithMentions: Story = {
  args: {
    placeholder: 'Type @ to open the mentions menu…',
    mentions: SAMPLE_MENTIONS,
  },
};

export const WithFileUpload: Story = {
  render: (args) => (
    <RichTextEditor
      {...args}
      onFileSelect={async (file: File) => URL.createObjectURL(file)}
      onFileRemove={async () => undefined}
    />
  ),
  args: { placeholder: 'Attach a file with the toolbar button…' },
};

export const WithMaxLength: Story = {
  args: {
    placeholder: 'Try typing past 40 characters — input is blocked at the limit.',
    maxLength: 40,
  },
};

export const WithFileFilter: Story = {
  render: (args) => (
    <RichTextEditor
      {...args}
      onFileSelect={async (file: File) => URL.createObjectURL(file)}
      onFileRemove={async () => undefined}
    />
  ),
  args: {
    placeholder: 'Only images can be attached via the file picker (jpg, png, gif, webp).',
    fileFilter: '.jpg,.jpeg,.png,.gif,.webp',
  },
};

export const PlainTextPaste: Story = {
  args: {
    placeholder: 'Paste formatted content from another app — it will be inserted as plain text.',
    pastePlainText: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    initialValue: '<p>This content is read-only.</p>',
  },
};

type RichTextEditorProps = React.ComponentProps<typeof RichTextEditor>;

// Extracted so useState satisfies the rules-of-hooks linter — anonymous
// arrow renders in story `render` callbacks fail the PascalCase-component check.
const ControlledStory = (args: RichTextEditorProps) => {
  const [value, setValue] = useState(
    '<p>This editor is <strong>controlled</strong>. Type below and watch the HTML update.</p>'
  );
  return (
    <div style={{ display: 'grid', gap: 12 }}>
      <RichTextEditor {...args} value={value} onChange={setValue} />
      <details>
        <summary style={{ cursor: 'pointer', fontWeight: 600 }}>Serialised HTML</summary>
        <pre
          style={{
            background: '#f6f8fa',
            border: '1px solid #e1e4e8',
            borderRadius: 4,
            padding: 12,
            fontSize: 12,
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-all',
          }}
        >
          {value}
        </pre>
      </details>
    </div>
  );
};

export const Controlled: Story = {
  argTypes: {
    value: { control: false },
    onChange: { control: false },
  },
  render: (args) => <ControlledStory {...args} />,
};

const FullFeaturedStory = (args: RichTextEditorProps) => {
  const [value, setValue] = useState(
    '<h2>Release notes</h2>' +
      '<p>Hello team — here is a summary you can edit, format, mention people in, and attach files to.</p>' +
      '<ul><li><strong>Bold</strong>, <em>italic</em> and <u>underline</u> via the toolbar.</li>' +
      '<li>Headings, quotes and lists from the block-type dropdown.</li>' +
      '<li>Auto-linked URLs: https://www.adslot.com</li>' +
      '<li>Markdown shortcuts work as you type.</li></ul>' +
      '<blockquote>Type <code>@</code> to mention a teammate.</blockquote>'
  );
  return (
    <RichTextEditor
      {...args}
      value={value}
      onChange={setValue}
      mentions={SAMPLE_MENTIONS}
      onFileSelect={async (file: File) => URL.createObjectURL(file)}
      onFileRemove={async () => undefined}
    />
  );
};

const PROGRAMMATIC_SNIPPETS = [
  { id: 'heading', label: 'Load heading + paragraph', html: '<h1>Loaded heading</h1><p>Programmatically inserted content.</p>' },
  { id: 'paragraph', label: 'Load formatted paragraph', html: '<p>Plain paragraph with <strong>bold</strong> and <em>italic</em>.</p>' },
  { id: 'list', label: 'Load bullet list', html: '<ul><li>One</li><li>Two</li><li>Three</li></ul>' },
  {
    id: 'rich',
    label: 'Load bold + strike + centered',
    html:
      '<p style="text-align: center"><strong>Centered bold</strong> next to <s>struck-through text</s> and inline <code>code()</code>.</p>',
  },
  { id: 'clear', label: 'Clear', html: '' },
];

const ProgrammaticContentStory = (args: RichTextEditorProps) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const load = (html: string) => {
    const node = wrapperRef.current?.querySelector('.aui--editor-content') as
      | (HTMLElement & { __lexicalEditor?: unknown })
      | null;
    const editor = node?.__lexicalEditor;
    if (editor) RichTextEditor.loadHTMLInto(editor, html);
  };
  return (
    <div style={{ display: 'grid', gap: 12 }}>
      <div ref={wrapperRef}>
        <RichTextEditor {...args} />
      </div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {PROGRAMMATIC_SNIPPETS.map((snippet) => (
          <button key={snippet.id} type="button" onClick={() => load(snippet.html)}>
            {snippet.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export const ProgrammaticContent: Story = {
  render: (args) => <ProgrammaticContentStory {...args} />,
  args: { placeholder: 'Use the buttons below to replace content via RichTextEditor.loadHTMLInto.' },
};

export const FullFeatured: Story = {
  argTypes: {
    value: { control: false },
    onChange: { control: false },
  },
  render: (args) => <FullFeaturedStory {...args} />,
  args: {
    placeholder: 'Edit the release notes…',
    maxLength: 4096,
  },
};
