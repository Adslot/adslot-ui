"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
const useIsUnmounted = () => {
  const isUnmounted = _react.default.useRef(false);
  _react.default.useEffect(() => {
    isUnmounted.current = false;
    return () => {
      isUnmounted.current = true;
    };
  }, []);
  return _react.default.useCallback(() => isUnmounted.current, []);
};
var _default = exports.default = useIsUnmounted;