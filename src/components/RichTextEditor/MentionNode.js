import _ from 'lodash';
import { $applyNodeReplacement, TextNode } from 'lexical';

/**
 * Recreates a MentionNode from a mention element serialized by exportDOM,
 * keeping HTML round-trips lossless.
 */
const $convertMentionElement = (domNode) => {
  const mentionName = domNode.getAttribute('data-lexical-mention-name');
  const text = domNode.textContent;
  return { node: $createMentionNode(mentionName || text, text) };
};

/**
 * An inline, atomic mention. Implemented as a TextNode subclass following
 * Lexical's documented mentions example, so it serializes to/from both the
 * editor's JSON state and HTML.
 */
export class MentionNode extends TextNode {
  static getType() {
    return 'mention';
  }

  static clone(node) {
    return new MentionNode(node.__mention, node.__text, node.__key);
  }

  static importJSON(serializedNode) {
    return $createMentionNode(serializedNode.mentionName).updateFromJSON(serializedNode);
  }

  static importDOM() {
    return {
      span: (domNode) => {
        if (!domNode.hasAttribute('data-lexical-mention')) {
          return null;
        }
        return { conversion: $convertMentionElement, priority: 1 };
      },
    };
  }

  constructor(mentionName, text, key) {
    super(text ?? mentionName, key);
    this.__mention = mentionName;
  }

  exportJSON() {
    return { ...super.exportJSON(), mentionName: this.__mention };
  }

  createDOM(config) {
    const dom = super.createDOM(config);
    dom.className = 'mention';
    dom.spellcheck = false;
    return dom;
  }

  exportDOM() {
    const element = document.createElement('span');
    element.setAttribute('data-lexical-mention', 'true');
    if (!_.isEqual(this.__text, this.__mention)) {
      element.setAttribute('data-lexical-mention-name', this.__mention);
    }
    element.className = 'mention';
    element.textContent = this.__text;
    return { element };
  }

  isTextEntity() {
    return true;
  }

  canInsertTextBefore() {
    return false;
  }

  canInsertTextAfter() {
    return false;
  }
}

export const $createMentionNode = (mentionName, textContent) => {
  const mentionNode = new MentionNode(mentionName, textContent ?? mentionName);
  mentionNode.setMode('segmented').toggleDirectionless();
  return $applyNodeReplacement(mentionNode);
};

export const $isMentionNode = (node) => node instanceof MentionNode;
