"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _Button = _interopRequireDefault(require("../Button"));

const baseClass = 'filepicker-component';

class FilePicker extends _react.default.PureComponent {
  constructor(props) {
    super(props);
    this.fileInput = /*#__PURE__*/_react.default.createRef();
  }

  state = {
    isFileSelected: false,
    fileName: ''
  };
  onChange = changeEvent => {
    if (!this.state.isFileSelected) {
      this.setState({
        isFileSelected: true,
        fileName: changeEvent.target.files[0].name
      });
      this.props.onSelect(changeEvent.target.files[0]);
    }
  };
  onUploadBtnClick = () => {
    this.fileInput.current.click();
  };
  removeFile = () => {
    this.fileInput.current.value = null;
    this.setState({
      isFileSelected: false,
      fileName: ''
    });

    if (this.props.onRemove) {
      this.props.onRemove();
    }
  };

  render() {
    const mainClass = (0, _classnames.default)({
      [`${baseClass}-highlight`]: this.props.isHighlighted
    }, baseClass, 'input-group');
    const {
      isFileSelected,
      fileName
    } = this.state;
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
      variant: "inverse",
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

}

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