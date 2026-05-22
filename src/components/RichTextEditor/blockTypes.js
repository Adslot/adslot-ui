// Canonical block-type identifiers reported by useActiveFormats and consumed by
// BlockTypeSelect. The heading and list values are aligned with Lexical's
// HeadingNode.getTag() and ListNode.getListType() return values, so they can be
// compared against the editor's API directly.
export const BLOCK_TYPE = {
  PARAGRAPH: 'paragraph',
  H1: 'h1',
  H2: 'h2',
  H3: 'h3',
  BULLET: 'bullet',
  NUMBER: 'number',
  QUOTE: 'quote',
  CODE: 'code',
};

export const BLOCK_TYPE_VALUES = Object.values(BLOCK_TYPE);
