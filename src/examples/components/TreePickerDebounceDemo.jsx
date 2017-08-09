import TreePickerSimplePureDemo from './TreePickerSimplePureDemo';

class TreePickerDebounceDemo extends TreePickerSimplePureDemo {
  constructor(props) {
    super(props);
    this.state.debounceInterval = 500;
    this.title = 'TreePickerSimplePure with interactive data (debounce 500ms)';
  }
}

export default TreePickerDebounceDemo;
