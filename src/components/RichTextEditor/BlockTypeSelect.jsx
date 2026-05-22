import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getSelection, $isRangeSelection, $createParagraphNode, $selectAll } from 'lexical';
import { $setBlocksType } from '@lexical/selection';
import { $createHeadingNode, $createQuoteNode } from '@lexical/rich-text';
import { INSERT_ORDERED_LIST_COMMAND, INSERT_UNORDERED_LIST_COMMAND, REMOVE_LIST_COMMAND } from '@lexical/list';
import { $createCodeNode } from '@lexical/code';
import { BLOCK_TYPE, BLOCK_TYPE_VALUES } from './blockTypes';

const OPTIONS = [
  { value: BLOCK_TYPE.PARAGRAPH, label: 'Normal' },
  { value: BLOCK_TYPE.H1, label: 'Heading 1' },
  { value: BLOCK_TYPE.H2, label: 'Heading 2' },
  { value: BLOCK_TYPE.H3, label: 'Heading 3' },
  { value: BLOCK_TYPE.BULLET, label: 'Bullet List' },
  { value: BLOCK_TYPE.NUMBER, label: 'Numbered List' },
  { value: BLOCK_TYPE.QUOTE, label: 'Quote' },
  { value: BLOCK_TYPE.CODE, label: 'Code Block' },
];

const LIST_TYPES = {
  [BLOCK_TYPE.BULLET]: INSERT_UNORDERED_LIST_COMMAND,
  [BLOCK_TYPE.NUMBER]: INSERT_ORDERED_LIST_COMMAND,
};

/**
 * Toolbar dropdown that reports and changes the block type of the current
 * selection (paragraph, heading 1-3, bullet/numbered list, quote).
 */
const BlockTypeSelect = ({ blockType, disabled }) => {
  const [editor] = useLexicalComposerContext();

  const applyBlockType = (next) => {
    if (_.isEqual(next, blockType)) {
      return;
    }
    if (LIST_TYPES[next]) {
      editor.update(() => {
        const selection = $getSelection();
        if (!$isRangeSelection(selection)) {
          $selectAll();
        }
      });
      editor.dispatchCommand(LIST_TYPES[next], undefined);
      return;
    }
    if (_.isEqual(blockType, BLOCK_TYPE.BULLET) || _.isEqual(blockType, BLOCK_TYPE.NUMBER)) {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
    }
    editor.update(() => {
      if (!$isRangeSelection($getSelection())) {
        $selectAll();
      }
      const selection = $getSelection();
      if (_.isEqual(next, BLOCK_TYPE.QUOTE)) {
        $setBlocksType(selection, () => $createQuoteNode());
      } else if (_.isEqual(next, BLOCK_TYPE.PARAGRAPH)) {
        $setBlocksType(selection, () => $createParagraphNode());
      } else if (_.isEqual(next, BLOCK_TYPE.CODE)) {
        $setBlocksType(selection, () => $createCodeNode());
      } else {
        $setBlocksType(selection, () => $createHeadingNode(next));
      }
    });
  };

  return (
    <select
      data-testid="rich-text-editor-block-type"
      className="aui--editor-block-type"
      aria-label="Text style"
      title="Text style"
      value={blockType}
      disabled={disabled}
      onChange={(event) => applyBlockType(event.target.value)}
    >
      {OPTIONS.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

BlockTypeSelect.propTypes = {
  blockType: PropTypes.oneOf(BLOCK_TYPE_VALUES),
  disabled: PropTypes.bool,
};

export default BlockTypeSelect;
