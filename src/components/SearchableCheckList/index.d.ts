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
  /**
   * Hides the title
   */
  hideTitle?: boolean;
  onChange: (...args: any[]) => any;
  /**
   * Determines whether onSearch() will be fired on ENTER key press (Default behaviour is to fire onSearch() when the input changes)
   */
  searchOnEnter?: boolean;
  onSearch?: (...args: any[]) => any;
  onClear?: (...args: any[]) => any;
  showSearchButton?: boolean;
  footerText?: string;
}

declare const SearchableCheckList: React.FC<SearchableCheckListProps>;

export default SearchableCheckList;
