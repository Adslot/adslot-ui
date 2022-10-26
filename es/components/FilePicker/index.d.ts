import * as React from 'react';

export interface FilePickerProps {
  /**
   * determines if the filePicker is disabled
   */
  disabled?: boolean;
  /**
   * data-test-selector of the filePicker
   */
  dts?: string;
  /**
   * determines what file types the user can pick from the file input dialog box
   */
  filter?: string;
  /**
   * determines if the filePicker is highlighted or not
   */
  isHighlighted?: boolean;
  /**
   * the label to be displayed
   */
  label?: string;
  /**
   * function called when onRemove event is fired
   */
  onRemove?: (...args: any[]) => any;
  /**
   * function called when onSelect event is fired
   */
  onSelect: (...args: any[]) => any;
  /**
   * determines the placeholder when no date is selected
   */
  placeholder?: string;
}

export default class FilePicker extends React.Component<FilePickerProps, any> {
  render(): JSX.Element;
}
