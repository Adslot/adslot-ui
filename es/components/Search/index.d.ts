import * as React from 'react';

export interface SearchIcons {
  search?: React.ReactNode;
  loader?: React.ReactNode;
  close?: React.ReactNode;
}

export interface SearchProps {
  className?: string;
  /**
   * Milliseconds
   */
  debounceInterval?: number;
  /**
   * Determine whether the text area is disabled
   */
  disabled?: boolean;
  /**
   * Render `data-test-selector` onto the component. It can be useful for testing
   */
  dts?: string;
  /**
   * { search: React.Node, loader: React.Node, close: React.Node }
   */
  icons?: SearchIcons;
  isLoading?: boolean;
  onBlur?: (...args: any[]) => any;
  onChange?: (...args: any[]) => any;
  onClear?: (...args: any[]) => any;
  /**
   * Required
   */
  onSearch: (...args: any[]) => any;
  placeholder?: string;
  /**
   * Determines whether onSearch() will be fired on ENTER key press (Default behaviour is to fire onSearch() when the input changes)
   */
  searchOnEnter?: boolean;
  value?: string;
  /**
   * Determines whether displaying the search button or not
   */
  showSearchButton?: boolean;
}

declare const Search: React.ForwardRefExoticComponent<
  React.PropsWithoutRef<SearchProps> & React.RefAttributes<((...args: any[]) => any) | Element>
>;

export default Search;
