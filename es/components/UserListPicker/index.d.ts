import * as React from 'react';

export interface UserListPickerInitialSelection {
  avatar?: string;
  givenName?: string;
  id: number;
  surname?: string;
}

export interface UserListPickerUserHeaders {
  label?: string;
  toggle?: string;
}

export interface UserListPickerUsers {
  avatar?: string;
  givenName?: string;
  id: number;
  surname?: string;
}

export interface UserListPickerProps {
  allowEmptySelection?: boolean;
  /**
   * avatarColor({ avatar, givenName, id, surname })
   */
  avatarColor?: (...args: any[]) => any;
  emptyIcon?: string;
  emptyMessage?: string;
  emptySvgSymbol?: React.ReactNode;
  /**
   * Array of { avatar: PropTypes.string, givenName: PropTypes.string, surname: PropTypes.string, id: PropTypes.number }
   */
  initialSelection?: UserListPickerInitialSelection[];
  modalApply?: (...args: any[]) => any;
  modalDescription?: string;
  modalClose?: (...args: any[]) => any;
  modalTitle?: string;
  show?: boolean;
  /**
   * Shape of { label: PropTypes.string, toggle: PropTypes.string }
   */
  userHeaders?: UserListPickerUserHeaders;
  /**
   * Array of { avatar: PropTypes.string, givenName: PropTypes.string, surname: PropTypes.string, id: PropTypes.number }
   */
  users?: UserListPickerUsers[];
}

declare const UserListPicker: React.FC<UserListPickerProps>;

export default UserListPicker;
