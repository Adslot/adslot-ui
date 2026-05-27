import { useEffect, useState } from 'react';
import _ from 'lodash';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { mergeRegister, $getNearestNodeOfType, $findMatchingParent } from '@lexical/utils';
import { $getSelection, $isRangeSelection, $isRootOrShadowRoot } from 'lexical';
import { ListNode, $isListNode } from '@lexical/list';
import { $isHeadingNode, $isQuoteNode } from '@lexical/rich-text';
import { LinkNode } from '@lexical/link';
import { $isCodeNode } from '@lexical/code';
import { BLOCK_TYPE } from './blockTypes';

const EMPTY_FORMATS = {
  bold: false,
  italic: false,
  underline: false,
  strikethrough: false,
  code: false,
  blockType: BLOCK_TYPE.PARAGRAPH,
  alignment: null,
  isLink: false,
  linkUrl: '',
};

// Finds the top-level block element containing the selection anchor.
const $blockOf = (anchorNode) =>
  $findMatchingParent(anchorNode, (node) => !$isRootOrShadowRoot(node) && $isRootOrShadowRoot(node.getParent()));

// Resolves the block type label for the block containing the selection.
const $resolveBlockType = (anchorNode) => {
  const element = $blockOf(anchorNode);
  if (_.isEqual(element, null)) {
    return BLOCK_TYPE.PARAGRAPH;
  }
  if ($isListNode(element)) {
    return _.isEqual(element.getListType(), BLOCK_TYPE.NUMBER) ? BLOCK_TYPE.NUMBER : BLOCK_TYPE.BULLET;
  }
  const listNode = $getNearestNodeOfType(anchorNode, ListNode);
  if ($isListNode(listNode)) {
    return _.isEqual(listNode.getListType(), BLOCK_TYPE.NUMBER) ? BLOCK_TYPE.NUMBER : BLOCK_TYPE.BULLET;
  }
  if ($isHeadingNode(element)) {
    return element.getTag();
  }
  if ($isQuoteNode(element)) {
    return BLOCK_TYPE.QUOTE;
  }
  if ($isCodeNode(element)) {
    return BLOCK_TYPE.CODE;
  }
  return BLOCK_TYPE.PARAGRAPH;
};

// Reads the text-align format of the block containing the selection.
const $resolveAlignment = (anchorNode) => {
  const element = $blockOf(anchorNode);
  const format = element && _.isEqual(typeof element.getFormatType, 'function') ? element.getFormatType() : '';
  return format || null;
};

// Returns the nearest LinkNode ancestor of the selection anchor (or the anchor
// itself if it is a LinkNode), or null. `$getNearestNodeOfType` walks from the
// node itself outward, so we don't need a separate `$isLinkNode` early-return.
const $linkOf = (anchorNode) => $getNearestNodeOfType(anchorNode, LinkNode);

const useActiveFormats = () => {
  const [editor] = useLexicalComposerContext();
  const [formats, setFormats] = useState(EMPTY_FORMATS);

  useEffect(() => {
    const readFormats = () => {
      const selection = $getSelection();
      if (!$isRangeSelection(selection)) {
        setFormats((prev) => (_.isEqual(prev, EMPTY_FORMATS) ? prev : EMPTY_FORMATS));
        return;
      }
      const anchorNode = selection.anchor.getNode();
      const linkNode = $linkOf(anchorNode);
      const next = {
        bold: selection.hasFormat('bold'),
        italic: selection.hasFormat('italic'),
        underline: selection.hasFormat('underline'),
        strikethrough: selection.hasFormat('strikethrough'),
        code: selection.hasFormat('code'),
        blockType: $resolveBlockType(anchorNode),
        alignment: $resolveAlignment(anchorNode),
        isLink: !_.isEqual(linkNode, null),
        linkUrl: linkNode ? linkNode.getURL() : '',
      };
      // Skip the state update (and the resulting re-render of every toolbar
      // control) when the read values are identical to the previous snapshot
      // — e.g. for caret moves within unformatted text.
      setFormats((prev) => (_.isEqual(prev, next) ? prev : next));
    };

    return mergeRegister(editor.registerUpdateListener(({ editorState }) => editorState.read(readFormats)));
  }, [editor]);

  return formats;
};

export default useActiveFormats;
