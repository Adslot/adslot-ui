import TreePickerSimplePureDemo from './TreePickerSimplePureDemo';

class TreePickerDebounceDemo extends TreePickerSimplePureDemo {
  constructor(props) {
    super(props);
    this.state.debounceInterval = 500;
  }
}

export default TreePickerDebounceDemo;
