import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _defineProperty from "@babel/runtime/helpers/defineProperty";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import Button from '../Button';
var baseClass = 'filepicker-component';

var FilePicker = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(FilePicker, _React$PureComponent);

  var _super = _createSuper(FilePicker);

  function FilePicker(props) {
    var _this;

    _classCallCheck(this, FilePicker);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "state", {
      isFileSelected: false,
      fileName: ''
    });

    _defineProperty(_assertThisInitialized(_this), "onChange", function (changeEvent) {
      if (!_this.state.isFileSelected) {
        _this.setState({
          isFileSelected: true,
          fileName: changeEvent.target.files[0].name
        });

        _this.props.onSelect(changeEvent.target.files[0]);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onUploadBtnClick", function () {
      _this.fileInput.current.click();
    });

    _defineProperty(_assertThisInitialized(_this), "removeFile", function () {
      _this.fileInput.current.value = null;

      _this.setState({
        isFileSelected: false,
        fileName: ''
      });

      if (_this.props.onRemove) {
        _this.props.onRemove();
      }
    });

    _this.fileInput = /*#__PURE__*/React.createRef();
    return _this;
  }

  _createClass(FilePicker, [{
    key: "render",
    value: function render() {
      var mainClass = classNames(_defineProperty({}, "".concat(baseClass, "-highlight"), this.props.isHighlighted), baseClass, 'input-group');
      var _this$state = this.state,
          isFileSelected = _this$state.isFileSelected,
          fileName = _this$state.fileName;
      return /*#__PURE__*/React.createElement("div", {
        className: mainClass
      }, /*#__PURE__*/React.createElement("input", {
        className: "form-control",
        type: "text",
        disabled: true,
        placeholder: this.props.placeholder,
        readOnly: "readonly",
        value: fileName,
        title: fileName
      }), /*#__PURE__*/React.createElement("div", {
        className: "input-group-btn"
      }, isFileSelected ? /*#__PURE__*/React.createElement(Button, {
        className: "remove-file",
        onClick: this.removeFile
      }, "\xD7") : null, /*#__PURE__*/React.createElement(Button, {
        variant: "inverse",
        onClick: this.onUploadBtnClick,
        disabled: this.props.disabled || isFileSelected
      }, /*#__PURE__*/React.createElement("span", null, this.props.label), /*#__PURE__*/React.createElement("input", {
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
}(React.PureComponent);

FilePicker.propTypes = {
  /**
   * determines if the filePicker is disabled
   */
  disabled: PropTypes.bool,

  /**
   * data-test-selector of the filePicker
   */
  dts: PropTypes.string,

  /**
   * determines what file types the user can pick from the file input dialog box
   */
  filter: PropTypes.string,

  /**
   * determines if the filePicker is highlighted or not
   */
  isHighlighted: PropTypes.bool,

  /**
   * the label to be displayed
   */
  label: PropTypes.string,

  /**
   * function called when onRemove event is fired
   */
  onRemove: PropTypes.func,

  /**
   * function called when onSelect event is fired
   */
  onSelect: PropTypes.func.isRequired,

  /**
   * determines the placeholder when no date is selected
   */
  placeholder: PropTypes.string
};
FilePicker.defaultProps = {
  isHighlighted: false,
  label: 'Select',
  placeholder: 'No file selected',
  disabled: false
};
export default FilePicker;