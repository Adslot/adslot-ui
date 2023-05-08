import * as React from 'react';

export interface ConfirmModalProps {
  /**
   * determines the label of cancel button
   */
  buttonCancelLabel?: string;
  /**
   * determines the label of confirm button
   */
  buttonConfirmLabel?: string;
  /**
   * function called when modalApply event is fired
   */
  modalApply?: (...args: any[]) => any;
  /**
   * function called when modalClose event is fired
   */
  modalClose?: (...args: any[]) => any;
  /**
   * description of the modal
   */
  modalDescription?: string;
  /**
   * title of the modal
   */
  modalTitle?: string;
  /**
   * determines if the modal needs to be shown or not
   */
  show?: boolean;
  dts?: string;
}

declare const ConfirmModal: React.FC<ConfirmModalProps>;

export default ConfirmModal;
