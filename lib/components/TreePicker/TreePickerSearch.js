"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _classnames = _interopRequireDefault(require("classnames"));
var _useIsUnmounted = _interopRequireDefault(require("../../hooks/useIsUnmounted"));
var _Search = _interopRequireDefault(require("../Search"));
var _TreePickerContext = require("./TreePickerContext");
const getIsInternalDisabled = state => state.isResolvingRoot || !!state.expandingNodeId;
const TreePickerSearch = ({
  resolveNodes,
  className,
  disabled,
  ...rest
}) => {
  const [isLoading, setIsLoading] = _react.default.useState();
  const inputRef = _react.default.useRef();
  const textRef = _react.default.useRef('');
  const isUnmounted = (0, _useIsUnmounted.default)();
  const search = (0, _TreePickerContext.useTreePickerSearch)();
  const {
    searchTo
  } = (0, _TreePickerContext.useInternalActions)();
  const internalDisable = (0, _TreePickerContext.useTreePickerSlice)(getIsInternalDisabled);
  const getTreeState = (0, _TreePickerContext.useTreePickerGetState)();

  // TODO fix Search
  _react.default.useLayoutEffect(() => {
    inputRef.current.value = search;
  }, [search]);
  const isDisabled = disabled ?? internalDisable;
  return /*#__PURE__*/_react.default.createElement(_Search.default, Object.assign({}, rest, {
    ref: inputRef,
    disabled: isDisabled,
    className: (0, _classnames.default)('aui--tree-picker-search', 'aui--tree-picker-section', className),
    isLoading: isLoading,
    showSearchButton: false,
    onSearch: async searchText => {
      if (!searchText) return searchTo();
      textRef.current = searchText;
      setIsLoading(true);
      try {
        const paths = getTreeState().paths;
        const currentNode = paths[paths.length - 1] || null;
        const nodes = await resolveNodes(searchText, currentNode);

        // ignore falsy nodes
        // or if search itself is unmounted
        // or when user types in quick succession
        // ignore the old search results
        if (!nodes || textRef.current !== searchText || isUnmounted()) return;
        searchTo(nodes, searchText);
      } catch (error) {
        console.error('[TreePickerSearch]', error);
      } finally {
        setIsLoading(false);
      }
    },
    onClear: () => searchTo()
  }));
};
TreePickerSearch.propTypes = {
  resolveNodes: _propTypes.default.func.isRequired,
  className: _propTypes.default.string,
  disabled: _propTypes.default.bool
};
var _default = exports.default = TreePickerSearch;