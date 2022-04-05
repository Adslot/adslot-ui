import * as React from 'react';

export interface SearchableCheckListContext {
  singularLabel: string;
  pluralLabel: string;
}

export interface SearchableCheckListItems {
  value: string;
  label: string;
}

export interface SearchableCheckListProps {
  /**
   * Context of the list displayed: {singularLabel: PropTypes.string, pluralLabel: PropTypes.string}
   */
  context: SearchableCheckListContext;
  /**
   * List of items: { value: PropTypes.string, label: PropTypes.string }
   */
  items?: SearchableCheckListItems[];
  /**
   * List of checked items value
   */
  selectedItemsKeys?: string[];
  /**
   * Search placeholder
   */
  placeholder?: string;
  /**
   * Number of checkbox items to render
   */
  displayCount?: number;
  onChange: (...args: any[]) => any;
}

declare const SearchableCheckList: React.FC<SearchableCheckListProps>;

export default SearchableCheckList;
