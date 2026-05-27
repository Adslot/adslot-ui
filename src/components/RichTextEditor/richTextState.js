import _ from 'lodash';
import { useMemo } from 'react';
import { $createTextNode, $getRoot, createEditor } from 'lexical';
import { ListNode, ListItemNode } from '@lexical/list';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { LinkNode, AutoLinkNode } from '@lexical/link';
import { TableNode, TableCellNode, TableRowNode } from '@lexical/table';
import { CodeNode, CodeHighlightNode } from '@lexical/code';
import { $generateHtmlFromNodes, $generateNodesFromDOM } from '@lexical/html';
import { appendImportedNodes, onError } from './helpers';
import { MentionNode, $isMentionNode } from './MentionNode';

const DISCRETE = { discrete: true };

// A headless Lexical editor, used as the opaque "editor state" value passed
// between stateFromHTML, useTruncateState and stateToHTML.
const createRichTextEditor = () =>
  createEditor({
    namespace: 'AdslotRichTextEditorState',
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
    onError,
  });

/**
 * Parses an HTML string into an opaque editor state. Retained for backward
 * compatibility (the Paragraph component truncates rich text with it); the
 * editor component's own props all use plain HTML strings.
 *
 * @example
 * // optional parser, e.g. to sanitise the input with DOMPurify:
 * const parser = (html) => DOMPurify.sanitize(html, { RETURN_DOM: true });
 * RichTextEditor.stateFromHTML(html, { parser });
 */
export const stateFromHTML = (html, options = {}) => {
  const editor = createRichTextEditor();
  const safeHtml = html || '';
  editor.update(() => {
    const root = $getRoot();
    root.clear();
    const source = options.parser ? options.parser(safeHtml) : new DOMParser().parseFromString(safeHtml, 'text/html');
    appendImportedNodes(root, $generateNodesFromDOM(editor, source));
  }, DISCRETE);
  return editor;
};

/**
 * Serialises an opaque editor state produced by stateFromHTML back to HTML.
 */
export const stateToHTML = (editor) => {
  let html = '';
  editor.getEditorState().read(() => {
    html = $generateHtmlFromNodes(editor, null);
  });
  return html;
};

const countCharacters = (editor) => {
  let count = 0;
  editor.getEditorState().read(() => {
    count = _.sumBy($getRoot().getAllTextNodes(), (node) => node.getTextContent().length);
  });
  return count;
};

const cloneEditor = (editor) => {
  const clone = createRichTextEditor();
  // parseEditorState accepts the SerializedEditorState object directly, so the
  // stringify/parse round-trip is unnecessary. toJSON() already returns a fresh
  // object, so the clone shares no state with the source editor.
  clone.setEditorState(clone.parseEditorState(editor.getEditorState().toJSON()));
  return clone;
};

const truncateEditor = (editor, briefCharCount, truncateString) => {
  const clone = cloneEditor(editor);
  clone.update(() => {
    const root = $getRoot();
    let remaining = briefCharCount;
    const removals = [];

    root.getAllTextNodes().forEach((node) => {
      const size = node.getTextContent().length;
      if (remaining >= size) {
        remaining -= size;
        return;
      }
      // A mention is atomic — drop it whole rather than slicing through it;
      // plain text is cut at the boundary. Either way the budget is now spent,
      // so every node after this one is dropped too.
      if (remaining > 0 && !$isMentionNode(node)) {
        node.setTextContent(node.getTextContent().slice(0, remaining));
      } else {
        removals.push(node);
      }
      remaining = 0;
    });

    removals.forEach((node) => node.remove());

    // Drop top-level blocks emptied by the truncation.
    root.getChildren().forEach((block) => {
      if (!block.getTextContent().length) {
        block.remove();
      }
    });

    // Append the truncate string after the last remaining text node so it lands
    // inside a valid block rather than directly under the root.
    if (truncateString) {
      const textNodes = root.getAllTextNodes();
      const lastTextNode = textNodes[textNodes.length - 1];
      if (lastTextNode) {
        lastTextNode.insertAfter($createTextNode(truncateString));
      }
    }
  }, DISCRETE);
  return clone;
};

/**
 * Hook that truncates an opaque editor state to briefCharCount characters,
 * preserving inline formatting and appending truncateString. Retained for
 * backward compatibility (used by the Paragraph component).
 */
export const useTruncateState = ({ editorState, briefCharCount, truncateString }) => {
  const totalCharCount = useMemo(() => countCharacters(editorState), [editorState]);

  const truncatedState = useMemo(() => {
    if (totalCharCount <= briefCharCount) {
      return editorState;
    }
    return truncateEditor(editorState, briefCharCount, truncateString);
  }, [editorState, briefCharCount, totalCharCount, truncateString]);

  return { totalCharCount, truncatedState };
};
