"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
const useCallbackRef = callback => {
  const ref = _react.default.useRef(callback);
  _react.default.useLayoutEffect(() => {
    ref.current = callback;
  });
  return ref;
};
var _default = exports.default = useCallbackRef;