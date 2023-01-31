"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _utils = require("../lib/utils");
const VALID_KEYS = {
  horizontal: ['ArrowLeft', 'ArrowRight'],
  vertical: ['ArrowUp', 'ArrowDown']
};

/**
 * @description internal hook to help with keyboard navigation in lists/menus.
 * Handles focusing the next/previous element with arrow keys. 
 * 
 * Child elements matching `selector` will be .
 * 
 * To disable (i.e skip) an item, use the `disabled` attribute (for elements that accept it), or the `aria-disabled` attribute.
 * 
 * @example
 * ```jsx
  const ref = React.useRef()
  // focusEl can be used to focus the first (or nth) element programatically
  const { focusEl } = useArrowFocus({
    ref,
    selector: 'button'
  });

  return (
    <div ref={ref}>
      <button>1</button>
      <button>2</button>
    </div>
  )
 * ```
 * @param {object} options options object
 * @param {object} options.ref ref attatched to the parent element
 * @param {string} options.selector selector to pass to `querySelectorAll`. These are the elements that will be focused.
 * @param {function} [options.onFocus] callback to be called when focussing an element. Receives element.
 * @param {boolean} [options.loop] when true, navigating past the end of the list goes back to the beginning, and vice-versa
 * @param {'vertical'|'horizontal'} [options.orientation] determines the arrow keys used based on the direction of the list
 */
const useArrowFocus = _ref => {
  let {
    ref,
    selector,
    onFocus,
    loop = true,
    orientation = 'vertical'
  } = _ref;
  (0, _utils.invariant)(selector, 'useArrowFocus requires a DOM selector to be passed to querySelectorAll');
  const onFocusRef = _react.default.useRef(onFocus);
  _react.default.useLayoutEffect(() => {
    onFocusRef.current = onFocus;
  });
  const getDOMList = _react.default.useCallback(() => Array.from(ref.current?.querySelectorAll(selector) ?? 0), [ref, selector]);
  const getIsDisabled = function () {
    let {
      disabled,
      ariaDisabled
    } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    if (disabled || ariaDisabled === 'true') return true;
    return false;
  };
  const focusEl = function () {
    let n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    const DOMList = getDOMList();
    if (DOMList.length === 0 || !DOMList[n]) return;
    const nextEl = DOMList[n];
    if (!nextEl || getIsDisabled(nextEl)) return;
    nextEl.focus();
    onFocusRef.current?.(nextEl);
  };
  _react.default.useEffect(() => {
    const focusNext = isForward => {
      const DOMList = getDOMList();
      if (DOMList.length === 0) return;
      const index = DOMList.findIndex(el => el === document.activeElement);
      let i = index;
      while (i >= 0) {
        isForward ? i++ : i--;
        if (loop) {
          if (isForward && i === DOMList.length) {
            i = 0;
          }
          if (!isForward && i === -1) {
            i = DOMList.length - 1;
          }
        }
        if (!getIsDisabled(DOMList[i])) {
          break;
        }
        if (i === index) {
          break;
        }
      }
      const nextEl = DOMList[i];
      if (nextEl && !getIsDisabled(nextEl)) {
        nextEl.focus();
        onFocusRef.current?.(nextEl);
      }
    };
    const handleKeyDown = event => {
      if (!ref.current) return;
      if (!ref.current.contains(document.activeElement)) return;
      if (!VALID_KEYS[orientation].includes(event.key)) return;
      event.preventDefault();
      const isForward = ['ArrowDown', 'ArrowRight'].includes(event.key);
      focusNext(isForward);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [getDOMList, loop, orientation, ref]);
  return {
    focusEl
  };
};
var _default = useArrowFocus;
exports.default = _default;