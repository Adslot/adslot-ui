"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _Button = _interopRequireDefault(require("../Button"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var baseClass = 'filepicker-component';

var FilePicker = /*#__PURE__*/function (_React$PureComponent) {
  (0, _inherits2.default)(FilePicker, _React$PureComponent);

  var _super = _createSuper(FilePicker);

  function FilePicker(props) {
    var _this;

    (0, _classCallCheck2.default)(this, FilePicker);
    _this = _super.call(this, props);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "state", {
      isFileSelected: false,
      fileName: ''
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onChange", function (changeEvent) {
      if (!_this.state.isFileSelected) {
        _this.setState({
          isFileSelected: true,
          fileName: changeEvent.target.files[0].name
        });

        _this.props.onSelect(changeEvent.target.files[0]);
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onUploadBtnClick", function () {
      _this.fileInput.current.click();
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "removeFile", function () {
      _this.fileInput.current.value = null;

      _this.setState({
        isFileSelected: false,
        fileName: ''
      });

      if (_this.props.onRemove) {
        _this.props.onRemove();
      }
    });
    _this.fileInput = /*#__PURE__*/_react.default.createRef();
    return _this;
  }

  (0, _createClass2.default)(FilePicker, [{
    key: "render",
    value: function render() {
      var mainClass = (0, _classnames.default)((0, _defineProperty2.default)({}, "".concat(baseClass, "-highlight"), this.props.isHighlighted), baseClass, 'input-group');
      var _this$state = this.state,
          isFileSelected = _this$state.isFileSelected,
          fileName = _this$state.fileName;
      return /*#__PURE__*/_react.default.createElement("div", {
        className: mainClass
      }, /*#__PURE__*/_react.default.createElement("input", {
        className: "form-control",
        type: "text",
        disabled: true,
        placeholder: this.props.placeholder,
        readOnly: "readonly",
        value: fileName,
        title: fileName
      }), /*#__PURE__*/_react.default.createElement("div", {
        className: "input-group-btn"
      }, isFileSelected ? /*#__PURE__*/_react.default.createElement(_Button.default, {
        className: "remove-file",
        onClick: this.removeFile
      }, "\xD7") : null, /*#__PURE__*/_react.default.createElement(_Button.default, {
        inverse: true,
        onClick: this.onUploadBtnClick,
        disabled: this.props.disabled || isFileSelected
      }, /*#__PURE__*/_react.default.createElement("span", null, this.props.label), /*#__PURE__*/_react.default.createElement("input", {
        className: "file-input",
        ref: this.fileInput,
        type: "file",
        onChange: this.onChange,
        accept: this.props.filter,
        "data-test-selector": this.props.dts
      }))));
    }
  }]);
  return FilePicker;
}(_react.default.PureComponent);

FilePicker.propTypes = {
  /**
   * determines if the filePicker is disabled
   */
  disabled: _propTypes.default.bool,

  /**
   * data-test-selector of the filePicker
   */
  dts: _propTypes.default.string,

  /**
   * determines what file types the user can pick from the file input dialog box
   */
  filter: _propTypes.default.string,

  /**
   * determines if the filePicker is highlighted or not
   */
  isHighlighted: _propTypes.default.bool,

  /**
   * the label to be displayed
   */
  label: _propTypes.default.string,

  /**
   * function called when onRemove event is fired
   */
  onRemove: _propTypes.default.func,

  /**
   * function called when onSelect event is fired
   */
  onSelect: _propTypes.default.func.isRequired,

  /**
   * determines the placeholder when no date is selected
   */
  placeholder: _propTypes.default.string
};
FilePicker.defaultProps = {
  isHighlighted: false,
  label: 'Select',
  placeholder: 'No file selected',
  disabled: false
};
var _default = FilePicker;
exports.default = _default;