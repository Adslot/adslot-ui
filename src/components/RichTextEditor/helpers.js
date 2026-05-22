import _ from 'lodash';
import { $generateNodesFromDOM } from '@lexical/html';
import { ListNode, ListItemNode } from '@lexical/list';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { LinkNode, AutoLinkNode } from '@lexical/link';
import { TableNode, TableCellNode, TableRowNode } from '@lexical/table';
import { CodeNode, CodeHighlightNode } from '@lexical/code';
import { $createParagraphNode, $getRoot, $isElementNode, $isParagraphNode } from 'lexical';
import { MentionNode } from './MentionNode';
import sanitizeUrl from './sanitizeUrl';

const DISCRETE = { discrete: true };

// Maps Lexical node formats to the CSS classes defined in styles.css.
const theme = {
  paragraph: 'aui--editor-paragraph',
  text: {
    bold: 'aui--editor-text-bold',
    italic: 'aui--editor-text-italic',
    underline: 'aui--editor-text-underline',
    strikethrough: 'aui--editor-text-strikethrough',
    code: 'aui--editor-text-code',
  },
  list: {
    ul: 'aui--editor-list-ul',
    ol: 'aui--editor-list-ol',
    listitem: 'aui--editor-list-item',
  },
  heading: {
    h1: 'aui--editor-heading-h1',
    h2: 'aui--editor-heading-h2',
    h3: 'aui--editor-heading-h3',
  },
  quote: 'aui--editor-quote',
  link: 'aui--editor-link',
  table: 'aui--editor-table',
  tableRow: 'aui--editor-table-row',
  tableCell: 'aui--editor-table-cell',
  tableCellHeader: 'aui--editor-table-cell-header',
  code: 'aui--editor-code',
  codeHighlight: {
    atrule: 'aui--editor-token-attr',
    attr: 'aui--editor-token-attr',
    boolean: 'aui--editor-token-property',
    builtin: 'aui--editor-token-selector',
    cdata: 'aui--editor-token-comment',
    char: 'aui--editor-token-selector',
    class: 'aui--editor-token-function',
    'class-name': 'aui--editor-token-function',
    comment: 'aui--editor-token-comment',
    constant: 'aui--editor-token-property',
    deleted: 'aui--editor-token-property',
    doctype: 'aui--editor-token-comment',
    entity: 'aui--editor-token-operator',
    function: 'aui--editor-token-function',
    important: 'aui--editor-token-variable',
    inserted: 'aui--editor-token-selector',
    keyword: 'aui--editor-token-attr',
    namespace: 'aui--editor-token-variable',
    number: 'aui--editor-token-property',
    operator: 'aui--editor-token-operator',
    prolog: 'aui--editor-token-comment',
    property: 'aui--editor-token-property',
    punctuation: 'aui--editor-token-punctuation',
    regex: 'aui--editor-token-variable',
    selector: 'aui--editor-token-selector',
    string: 'aui--editor-token-selector',
    symbol: 'aui--editor-token-property',
    tag: 'aui--editor-token-property',
    url: 'aui--editor-token-operator',
    variable: 'aui--editor-token-variable',
  },
};

// Lexical recovers gracefully from update errors when onError does not re-throw.
export const onError = (error) => {
  console.error(error);
};

/**
 * Appends nodes produced by $generateNodesFromDOM to the root. Inline/text
 * nodes are invalid as direct root children, so consecutive inline nodes are
 * wrapped in a paragraph; whitespace-only nodes between block elements (e.g.
 * indentation in the source HTML) are dropped. Must run inside an editor
 * update.
 */
export const appendImportedNodes = (root, nodes) => {
  let paragraph = null;
  nodes.forEach((node) => {
    if ($isElementNode(node)) {
      root.append(node);
      paragraph = null;
      return;
    }
    if (_.isEqual(paragraph, null) && _.isEqual(node.getTextContent().trim(), '')) {
      return;
    }
    if (_.isEqual(paragraph, null)) {
      paragraph = $createParagraphNode();
      root.append(paragraph);
    }
    paragraph.append(node);
  });

  if (_.isEqual(root.getChildrenSize(), 0)) {
    root.append($createParagraphNode());
  }
};

/**
 * Returns an initial-state function that parses an HTML string into Lexical
 * nodes and appends them to the root.
 */
const prepopulateFromHTML = (html) => (editor) => {
  const dom = new DOMParser().parseFromString(html, 'text/html');
  appendImportedNodes($getRoot(), $generateNodesFromDOM(editor, dom));
};

/**
 * Builds the LexicalComposer initialConfig. value/initialValue seed the editor
 * once, at mount — there is intentionally no live re-sync afterwards.
 */
export const buildInitialConfig = ({ value, initialValue, disabled }) => {
  const html = value || initialValue || '';
  return {
    namespace: 'AdslotRichTextEditor',
    theme,
    onError,
    editable: !disabled,
    nodes: [
      ListNode,
      ListItemNode,
      MentionNode,
      HeadingNode,
      QuoteNode,
      LinkNode,
      AutoLinkNode,
      TableNode,
      TableCellNode,
      TableRowNode,
      CodeNode,
      CodeHighlightNode,
    ],
    editorState: html ? prepopulateFromHTML(html) : null,
  };
};

/**
 * True when the editor holds nothing but a single empty paragraph, so the
 * component can emit '' instead of placeholder markup such as '<p><br></p>'.
 */
export const isEditorEmpty = () => {
  const children = $getRoot().getChildren();
  if (!children.length) {
    return true;
  }
  if (children.length > 1) {
    return false;
  }
  const [first] = children;
  return $isParagraphNode(first) && _.isEqual(first.getTextContent(), '');
};

// LinkPlugin's validateUrl gate — rejects anything sanitizeUrl strips
// (i.e. only http/https/mailto survive).
export const isValidLinkUrl = (url) => !_.isEqual(sanitizeUrl(url), '');

const BLOCK_SELECTOR = 'p, li, h1, h2, h3, h4, h5, h6, blockquote, td, th';

export const loadHTMLInto = (editor, html, options = {}) => {
  editor.update(
    () => {
      const root = $getRoot();
      root.clear();
      const dom = new DOMParser().parseFromString(html || '', 'text/html');
      appendImportedNodes(root, $generateNodesFromDOM(editor, dom));
    },
    { ...DISCRETE, ...options }
  );
};

export const plainTextFromHTML = (html) => {
  if (!html) {
    return '';
  }
  const { body } = new DOMParser().parseFromString(html, 'text/html');
  const blocks = Array.from(body.querySelectorAll(BLOCK_SELECTOR));
  if (!blocks.length) {
    return body.textContent || '';
  }
  // Emit only "leaf" blocks (those without nested block descendants). Keeps
  // <blockquote><p>a</p><p>b</p></blockquote> as "a\nb" instead of joining
  // through the outer blockquote, and prevents <td><p>a</p></td> from
  // double-counting.
  const leaves = blocks.filter((el) => !el.querySelector(BLOCK_SELECTOR));
  return leaves.map((el) => el.textContent || '').join('\n');
};
