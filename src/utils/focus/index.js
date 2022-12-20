// Adapted from: https://github.com/adobe/react-spectrum
// Licensed under the Apache License, Version 2.0

const focusableElements = [
  'input:not([disabled]):not([type=hidden])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  'button:not([disabled])',
  'a[href]',
  'area[href]',
  'summary',
  'iframe',
  'object',
  'embed',
  'audio[controls]',
  'video[controls]',
  '[contenteditable]',
];

const FOCUSABLE_ELEMENT_SELECTOR =
  focusableElements.join(':not([hidden]),') + ',[tabindex]:not([disabled]):not([hidden])';

focusableElements.push('[tabindex]:not([tabindex="-1"]):not([disabled])');
const TABBABLE_ELEMENT_SELECTOR = focusableElements.join(':not([hidden]):not([tabindex="-1"]),');

function isStyleVisible(element) {
  if (!(element instanceof HTMLElement) && !(element instanceof SVGElement)) {
    return false;
  }
  const { display, visibility } = element.style;

  let isVisible = display !== 'none' && visibility !== 'hidden' && visibility !== 'collapse';

  if (isVisible) {
    const { getComputedStyle } = element.ownerDocument.defaultView;
    const { display: computedDisplay, visibility: computedVisibility } = getComputedStyle(element);

    isVisible = computedDisplay !== 'none' && computedVisibility !== 'hidden' && computedVisibility !== 'collapse';
  }

  return isVisible;
}

export function isElementVisible(element) {
  return (
    element &&
    element.nodeName !== '#comment' &&
    isStyleVisible(element) &&
    !element.hasAttribute('hidden') &&
    (!element.parentElement || isElementVisible(element.parentElement))
  );
}

/**
 * Create a [TreeWalker]{@link https://developer.mozilla.org/en-US/docs/Web/API/TreeWalker}
 * that matches all focusable/tabbable elements.
 * @param {Node} root - root node
 * @param {{tabbable: boolean, from: Node, accept: Function}} opts - options
 */
export function getFocusableTreeWalker(root, opts = {}) {
  const selector = opts.tabbable ? TABBABLE_ELEMENT_SELECTOR : FOCUSABLE_ELEMENT_SELECTOR;

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT, {
    acceptNode(node) {
      // Skip nodes inside the starting node.
      if (opts.from?.contains(node)) {
        return NodeFilter.FILTER_REJECT;
      }

      if (node.matches(selector) && isElementVisible(node) && (!opts.accept || opts.accept(node))) {
        return NodeFilter.FILTER_ACCEPT;
      }

      return NodeFilter.FILTER_SKIP;
    },
  });

  if (opts.from) {
    walker.currentNode = opts.from;
  }

  return walker;
}

/**
 * Get the nodes returned from getFocusableTreeWalker
 * @param {Node} root - Root node
 * @param {{tabbable: boolean, from: Node, accept: Function}} opts - options
 * @returns array of focusable nodes wthin `root`
 */
export const getFocusableNodes = (root, opts = {}) => {
  const nodes = [];
  const walker = getFocusableTreeWalker(root, opts);
  while (walker.nextNode()) nodes.push(walker.currentNode);
  return nodes;
};
