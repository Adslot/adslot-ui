import { queryHelpers, queries } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';
import * as pf from '@testing-library/dom/node_modules/pretty-format';
declare const customWithin: (target: HTMLElement) => {
  getByLabelText<T extends HTMLElement = HTMLElement>(
    id: import('@testing-library/react').Matcher,
    options?: queryHelpers.SelectorMatcherOptions
  ): T;
  getAllByLabelText<T_1 extends HTMLElement = HTMLElement>(
    id: import('@testing-library/react').Matcher,
    options?: queryHelpers.SelectorMatcherOptions
  ): T_1[];
  queryByLabelText<T_2 extends HTMLElement = HTMLElement>(
    id: import('@testing-library/react').Matcher,
    options?: queryHelpers.SelectorMatcherOptions
  ): T_2;
  queryAllByLabelText<T_3 extends HTMLElement = HTMLElement>(
    id: import('@testing-library/react').Matcher,
    options?: queryHelpers.SelectorMatcherOptions
  ): T_3[];
  findByLabelText<T_4 extends HTMLElement = HTMLElement>(
    id: import('@testing-library/react').Matcher,
    options?: queryHelpers.SelectorMatcherOptions,
    waitForElementOptions?: import('@testing-library/react').waitForOptions
  ): Promise<T_4>;
  findAllByLabelText<T_5 extends HTMLElement = HTMLElement>(
    id: import('@testing-library/react').Matcher,
    options?: queryHelpers.SelectorMatcherOptions,
    waitForElementOptions?: import('@testing-library/react').waitForOptions
  ): Promise<T_5[]>;
  getByPlaceholderText<T_6 extends HTMLElement = HTMLElement>(
    id: import('@testing-library/react').Matcher,
    options?: import('@testing-library/react').MatcherOptions
  ): T_6;
  getAllByPlaceholderText<T_7 extends HTMLElement = HTMLElement>(
    id: import('@testing-library/react').Matcher,
    options?: import('@testing-library/react').MatcherOptions
  ): T_7[];
  queryByPlaceholderText<T_8 extends HTMLElement = HTMLElement>(
    id: import('@testing-library/react').Matcher,
    options?: import('@testing-library/react').MatcherOptions
  ): T_8;
  queryAllByPlaceholderText<T_9 extends HTMLElement = HTMLElement>(
    id: import('@testing-library/react').Matcher,
    options?: import('@testing-library/react').MatcherOptions
  ): T_9[];
  findByPlaceholderText<T_10 extends HTMLElement = HTMLElement>(
    id: import('@testing-library/react').Matcher,
    options?: import('@testing-library/react').MatcherOptions,
    waitForElementOptions?: import('@testing-library/react').waitForOptions
  ): Promise<T_10>;
  findAllByPlaceholderText<T_11 extends HTMLElement = HTMLElement>(
    id: import('@testing-library/react').Matcher,
    options?: import('@testing-library/react').MatcherOptions,
    waitForElementOptions?: import('@testing-library/react').waitForOptions
  ): Promise<T_11[]>;
  getByText<T_12 extends HTMLElement = HTMLElement>(
    id: import('@testing-library/react').Matcher,
    options?: queryHelpers.SelectorMatcherOptions
  ): T_12;
  getAllByText<T_13 extends HTMLElement = HTMLElement>(
    id: import('@testing-library/react').Matcher,
    options?: queryHelpers.SelectorMatcherOptions
  ): T_13[];
  queryByText<T_14 extends HTMLElement = HTMLElement>(
    id: import('@testing-library/react').Matcher,
    options?: queryHelpers.SelectorMatcherOptions
  ): T_14;
  queryAllByText<T_15 extends HTMLElement = HTMLElement>(
    id: import('@testing-library/react').Matcher,
    options?: queryHelpers.SelectorMatcherOptions
  ): T_15[];
  findByText<T_16 extends HTMLElement = HTMLElement>(
    id: import('@testing-library/react').Matcher,
    options?: queryHelpers.SelectorMatcherOptions,
    waitForElementOptions?: import('@testing-library/react').waitForOptions
  ): Promise<T_16>;
  findAllByText<T_17 extends HTMLElement = HTMLElement>(
    id: import('@testing-library/react').Matcher,
    options?: queryHelpers.SelectorMatcherOptions,
    waitForElementOptions?: import('@testing-library/react').waitForOptions
  ): Promise<T_17[]>;
  getByAltText<T_18 extends HTMLElement = HTMLElement>(
    id: import('@testing-library/react').Matcher,
    options?: import('@testing-library/react').MatcherOptions
  ): T_18;
  getAllByAltText<T_19 extends HTMLElement = HTMLElement>(
    id: import('@testing-library/react').Matcher,
    options?: import('@testing-library/react').MatcherOptions
  ): T_19[];
  queryByAltText<T_20 extends HTMLElement = HTMLElement>(
    id: import('@testing-library/react').Matcher,
    options?: import('@testing-library/react').MatcherOptions
  ): T_20;
  queryAllByAltText<T_21 extends HTMLElement = HTMLElement>(
    id: import('@testing-library/react').Matcher,
    options?: import('@testing-library/react').MatcherOptions
  ): T_21[];
  findByAltText<T_22 extends HTMLElement = HTMLElement>(
    id: import('@testing-library/react').Matcher,
    options?: import('@testing-library/react').MatcherOptions,
    waitForElementOptions?: import('@testing-library/react').waitForOptions
  ): Promise<T_22>;
  findAllByAltText<T_23 extends HTMLElement = HTMLElement>(
    id: import('@testing-library/react').Matcher,
    options?: import('@testing-library/react').MatcherOptions,
    waitForElementOptions?: import('@testing-library/react').waitForOptions
  ): Promise<T_23[]>;
  getByTitle<T_24 extends HTMLElement = HTMLElement>(
    id: import('@testing-library/react').Matcher,
    options?: import('@testing-library/react').MatcherOptions
  ): T_24;
  getAllByTitle<T_25 extends HTMLElement = HTMLElement>(
    id: import('@testing-library/react').Matcher,
    options?: import('@testing-library/react').MatcherOptions
  ): T_25[];
  queryByTitle<T_26 extends HTMLElement = HTMLElement>(
    id: import('@testing-library/react').Matcher,
    options?: import('@testing-library/react').MatcherOptions
  ): T_26;
  queryAllByTitle<T_27 extends HTMLElement = HTMLElement>(
    id: import('@testing-library/react').Matcher,
    options?: import('@testing-library/react').MatcherOptions
  ): T_27[];
  findByTitle<T_28 extends HTMLElement = HTMLElement>(
    id: import('@testing-library/react').Matcher,
    options?: import('@testing-library/react').MatcherOptions,
    waitForElementOptions?: import('@testing-library/react').waitForOptions
  ): Promise<T_28>;
  findAllByTitle<T_29 extends HTMLElement = HTMLElement>(
    id: import('@testing-library/react').Matcher,
    options?: import('@testing-library/react').MatcherOptions,
    waitForElementOptions?: import('@testing-library/react').waitForOptions
  ): Promise<T_29[]>;
  getByDisplayValue<T_30 extends HTMLElement = HTMLElement>(
    id: import('@testing-library/react').Matcher,
    options?: import('@testing-library/react').MatcherOptions
  ): T_30;
  getAllByDisplayValue<T_31 extends HTMLElement = HTMLElement>(
    id: import('@testing-library/react').Matcher,
    options?: import('@testing-library/react').MatcherOptions
  ): T_31[];
  queryByDisplayValue<T_32 extends HTMLElement = HTMLElement>(
    id: import('@testing-library/react').Matcher,
    options?: import('@testing-library/react').MatcherOptions
  ): T_32;
  queryAllByDisplayValue<T_33 extends HTMLElement = HTMLElement>(
    id: import('@testing-library/react').Matcher,
    options?: import('@testing-library/react').MatcherOptions
  ): T_33[];
  findByDisplayValue<T_34 extends HTMLElement = HTMLElement>(
    id: import('@testing-library/react').Matcher,
    options?: import('@testing-library/react').MatcherOptions,
    waitForElementOptions?: import('@testing-library/react').waitForOptions
  ): Promise<T_34>;
  findAllByDisplayValue<T_35 extends HTMLElement = HTMLElement>(
    id: import('@testing-library/react').Matcher,
    options?: import('@testing-library/react').MatcherOptions,
    waitForElementOptions?: import('@testing-library/react').waitForOptions
  ): Promise<T_35[]>;
  getByRole<T_36 extends HTMLElement = HTMLElement>(
    role: import('@testing-library/react').ByRoleMatcher,
    options?: queries.ByRoleOptions
  ): T_36;
  getAllByRole<T_37 extends HTMLElement = HTMLElement>(
    role: import('@testing-library/react').ByRoleMatcher,
    options?: queries.ByRoleOptions
  ): T_37[];
  queryByRole<T_38 extends HTMLElement = HTMLElement>(
    role: import('@testing-library/react').ByRoleMatcher,
    options?: queries.ByRoleOptions
  ): T_38;
  queryAllByRole<T_39 extends HTMLElement = HTMLElement>(
    role: import('@testing-library/react').ByRoleMatcher,
    options?: queries.ByRoleOptions
  ): T_39[];
  findByRole<T_40 extends HTMLElement = HTMLElement>(
    role: import('@testing-library/react').ByRoleMatcher,
    options?: queries.ByRoleOptions,
    waitForElementOptions?: import('@testing-library/react').waitForOptions
  ): Promise<T_40>;
  findAllByRole<T_41 extends HTMLElement = HTMLElement>(
    role: import('@testing-library/react').ByRoleMatcher,
    options?: queries.ByRoleOptions,
    waitForElementOptions?: import('@testing-library/react').waitForOptions
  ): Promise<T_41[]>;
  getByTestId<T_42 extends HTMLElement = HTMLElement>(
    id: import('@testing-library/react').Matcher,
    options?: import('@testing-library/react').MatcherOptions
  ): T_42;
  getAllByTestId<T_43 extends HTMLElement = HTMLElement>(
    id: import('@testing-library/react').Matcher,
    options?: import('@testing-library/react').MatcherOptions
  ): T_43[];
  queryByTestId<T_44 extends HTMLElement = HTMLElement>(
    id: import('@testing-library/react').Matcher,
    options?: import('@testing-library/react').MatcherOptions
  ): T_44;
  queryAllByTestId<T_45 extends HTMLElement = HTMLElement>(
    id: import('@testing-library/react').Matcher,
    options?: import('@testing-library/react').MatcherOptions
  ): T_45[];
  findByTestId<T_46 extends HTMLElement = HTMLElement>(
    id: import('@testing-library/react').Matcher,
    options?: import('@testing-library/react').MatcherOptions,
    waitForElementOptions?: import('@testing-library/react').waitForOptions
  ): Promise<T_46>;
  findAllByTestId<T_47 extends HTMLElement = HTMLElement>(
    id: import('@testing-library/react').Matcher,
    options?: import('@testing-library/react').MatcherOptions,
    waitForElementOptions?: import('@testing-library/react').waitForOptions
  ): Promise<T_47[]>;
} & {
  queryAllByDts: (value: string) => HTMLElement[];
  queryByDts: (value: string) => HTMLElement;
  getAllByDts: (value: string) => HTMLElement[];
  getByDts: (value: string) => HTMLElement;
  findAllByDts: (
    args_0: string,
    args_1?: undefined,
    args_2?: import('@testing-library/react').waitForOptions
  ) => Promise<HTMLElement[]>;
  findByDts: (
    args_0: string,
    args_1?: undefined,
    args_2?: import('@testing-library/react').waitForOptions
  ) => Promise<HTMLElement>;
  queryAllByClass: (value: string) => HTMLElement[];
  queryByClass: (value: string) => HTMLElement;
  getAllByClass: (value: string) => HTMLElement[];
  getByClass: (value: string) => HTMLElement;
  findAllByClass: (
    args_0: string,
    args_1?: undefined,
    args_2?: import('@testing-library/react').waitForOptions
  ) => Promise<HTMLElement[]>;
  findByClass: (
    args_0: string,
    args_1?: undefined,
    args_2?: import('@testing-library/react').waitForOptions
  ) => Promise<HTMLElement>;
  getByLabelText: (
    id: import('@testing-library/react').Matcher,
    options?: queryHelpers.SelectorMatcherOptions
  ) => HTMLElement;
  getAllByLabelText: (
    id: import('@testing-library/react').Matcher,
    options?: queryHelpers.SelectorMatcherOptions
  ) => HTMLElement[];
  queryByLabelText: (
    id: import('@testing-library/react').Matcher,
    options?: queryHelpers.SelectorMatcherOptions
  ) => HTMLElement;
  queryAllByLabelText: (
    id: import('@testing-library/react').Matcher,
    options?: queryHelpers.SelectorMatcherOptions
  ) => HTMLElement[];
  findByLabelText: (
    id: import('@testing-library/react').Matcher,
    options?: queryHelpers.SelectorMatcherOptions,
    waitForElementOptions?: import('@testing-library/react').waitForOptions
  ) => Promise<HTMLElement>;
  findAllByLabelText: (
    id: import('@testing-library/react').Matcher,
    options?: queryHelpers.SelectorMatcherOptions,
    waitForElementOptions?: import('@testing-library/react').waitForOptions
  ) => Promise<HTMLElement[]>;
  getByPlaceholderText: (
    id: import('@testing-library/react').Matcher,
    options?: import('@testing-library/react').MatcherOptions
  ) => HTMLElement;
  getAllByPlaceholderText: (
    id: import('@testing-library/react').Matcher,
    options?: import('@testing-library/react').MatcherOptions
  ) => HTMLElement[];
  queryByPlaceholderText: (
    id: import('@testing-library/react').Matcher,
    options?: import('@testing-library/react').MatcherOptions
  ) => HTMLElement;
  queryAllByPlaceholderText: (
    id: import('@testing-library/react').Matcher,
    options?: import('@testing-library/react').MatcherOptions
  ) => HTMLElement[];
  findByPlaceholderText: (
    id: import('@testing-library/react').Matcher,
    options?: import('@testing-library/react').MatcherOptions,
    waitForElementOptions?: import('@testing-library/react').waitForOptions
  ) => Promise<HTMLElement>;
  findAllByPlaceholderText: (
    id: import('@testing-library/react').Matcher,
    options?: import('@testing-library/react').MatcherOptions,
    waitForElementOptions?: import('@testing-library/react').waitForOptions
  ) => Promise<HTMLElement[]>;
  getByText: (
    id: import('@testing-library/react').Matcher,
    options?: queryHelpers.SelectorMatcherOptions
  ) => HTMLElement;
  getAllByText: (
    id: import('@testing-library/react').Matcher,
    options?: queryHelpers.SelectorMatcherOptions
  ) => HTMLElement[];
  queryByText: (
    id: import('@testing-library/react').Matcher,
    options?: queryHelpers.SelectorMatcherOptions
  ) => HTMLElement;
  queryAllByText: (
    id: import('@testing-library/react').Matcher,
    options?: queryHelpers.SelectorMatcherOptions
  ) => HTMLElement[];
  findByText: (
    id: import('@testing-library/react').Matcher,
    options?: queryHelpers.SelectorMatcherOptions,
    waitForElementOptions?: import('@testing-library/react').waitForOptions
  ) => Promise<HTMLElement>;
  findAllByText: (
    id: import('@testing-library/react').Matcher,
    options?: queryHelpers.SelectorMatcherOptions,
    waitForElementOptions?: import('@testing-library/react').waitForOptions
  ) => Promise<HTMLElement[]>;
  getByAltText: (
    id: import('@testing-library/react').Matcher,
    options?: import('@testing-library/react').MatcherOptions
  ) => HTMLElement;
  getAllByAltText: (
    id: import('@testing-library/react').Matcher,
    options?: import('@testing-library/react').MatcherOptions
  ) => HTMLElement[];
  queryByAltText: (
    id: import('@testing-library/react').Matcher,
    options?: import('@testing-library/react').MatcherOptions
  ) => HTMLElement;
  queryAllByAltText: (
    id: import('@testing-library/react').Matcher,
    options?: import('@testing-library/react').MatcherOptions
  ) => HTMLElement[];
  findByAltText: (
    id: import('@testing-library/react').Matcher,
    options?: import('@testing-library/react').MatcherOptions,
    waitForElementOptions?: import('@testing-library/react').waitForOptions
  ) => Promise<HTMLElement>;
  findAllByAltText: (
    id: import('@testing-library/react').Matcher,
    options?: import('@testing-library/react').MatcherOptions,
    waitForElementOptions?: import('@testing-library/react').waitForOptions
  ) => Promise<HTMLElement[]>;
  getByTitle: (
    id: import('@testing-library/react').Matcher,
    options?: import('@testing-library/react').MatcherOptions
  ) => HTMLElement;
  getAllByTitle: (
    id: import('@testing-library/react').Matcher,
    options?: import('@testing-library/react').MatcherOptions
  ) => HTMLElement[];
  queryByTitle: (
    id: import('@testing-library/react').Matcher,
    options?: import('@testing-library/react').MatcherOptions
  ) => HTMLElement;
  queryAllByTitle: (
    id: import('@testing-library/react').Matcher,
    options?: import('@testing-library/react').MatcherOptions
  ) => HTMLElement[];
  findByTitle: (
    id: import('@testing-library/react').Matcher,
    options?: import('@testing-library/react').MatcherOptions,
    waitForElementOptions?: import('@testing-library/react').waitForOptions
  ) => Promise<HTMLElement>;
  findAllByTitle: (
    id: import('@testing-library/react').Matcher,
    options?: import('@testing-library/react').MatcherOptions,
    waitForElementOptions?: import('@testing-library/react').waitForOptions
  ) => Promise<HTMLElement[]>;
  getByDisplayValue: (
    id: import('@testing-library/react').Matcher,
    options?: import('@testing-library/react').MatcherOptions
  ) => HTMLElement;
  getAllByDisplayValue: (
    id: import('@testing-library/react').Matcher,
    options?: import('@testing-library/react').MatcherOptions
  ) => HTMLElement[];
  queryByDisplayValue: (
    id: import('@testing-library/react').Matcher,
    options?: import('@testing-library/react').MatcherOptions
  ) => HTMLElement;
  queryAllByDisplayValue: (
    id: import('@testing-library/react').Matcher,
    options?: import('@testing-library/react').MatcherOptions
  ) => HTMLElement[];
  findByDisplayValue: (
    id: import('@testing-library/react').Matcher,
    options?: import('@testing-library/react').MatcherOptions,
    waitForElementOptions?: import('@testing-library/react').waitForOptions
  ) => Promise<HTMLElement>;
  findAllByDisplayValue: (
    id: import('@testing-library/react').Matcher,
    options?: import('@testing-library/react').MatcherOptions,
    waitForElementOptions?: import('@testing-library/react').waitForOptions
  ) => Promise<HTMLElement[]>;
  getByRole: (role: import('@testing-library/react').ByRoleMatcher, options?: queries.ByRoleOptions) => HTMLElement;
  getAllByRole: (
    role: import('@testing-library/react').ByRoleMatcher,
    options?: queries.ByRoleOptions
  ) => HTMLElement[];
  queryByRole: (role: import('@testing-library/react').ByRoleMatcher, options?: queries.ByRoleOptions) => HTMLElement;
  queryAllByRole: (
    role: import('@testing-library/react').ByRoleMatcher,
    options?: queries.ByRoleOptions
  ) => HTMLElement[];
  findByRole: (
    role: import('@testing-library/react').ByRoleMatcher,
    options?: queries.ByRoleOptions,
    waitForElementOptions?: import('@testing-library/react').waitForOptions
  ) => Promise<HTMLElement>;
  findAllByRole: (
    role: import('@testing-library/react').ByRoleMatcher,
    options?: queries.ByRoleOptions,
    waitForElementOptions?: import('@testing-library/react').waitForOptions
  ) => Promise<HTMLElement[]>;
  getByTestId: (
    id: import('@testing-library/react').Matcher,
    options?: import('@testing-library/react').MatcherOptions
  ) => HTMLElement;
  getAllByTestId: (
    id: import('@testing-library/react').Matcher,
    options?: import('@testing-library/react').MatcherOptions
  ) => HTMLElement[];
  queryByTestId: (
    id: import('@testing-library/react').Matcher,
    options?: import('@testing-library/react').MatcherOptions
  ) => HTMLElement;
  queryAllByTestId: (
    id: import('@testing-library/react').Matcher,
    options?: import('@testing-library/react').MatcherOptions
  ) => HTMLElement[];
  findByTestId: (
    id: import('@testing-library/react').Matcher,
    options?: import('@testing-library/react').MatcherOptions,
    waitForElementOptions?: import('@testing-library/react').waitForOptions
  ) => Promise<HTMLElement>;
  findAllByTestId: (
    id: import('@testing-library/react').Matcher,
    options?: import('@testing-library/react').MatcherOptions,
    waitForElementOptions?: import('@testing-library/react').waitForOptions
  ) => Promise<HTMLElement[]>;
};
declare const customScreen: {
  queryAllByDts: (value: string) => HTMLElement[];
  queryByDts: (value: string) => HTMLElement;
  getAllByDts: (value: string) => HTMLElement[];
  getByDts: (value: string) => HTMLElement;
  findAllByDts: (
    args_0: string,
    args_1?: undefined,
    args_2?: import('@testing-library/react').waitForOptions
  ) => Promise<HTMLElement[]>;
  findByDts: (
    args_0: string,
    args_1?: undefined,
    args_2?: import('@testing-library/react').waitForOptions
  ) => Promise<HTMLElement>;
  queryAllByClass: (value: string) => HTMLElement[];
  queryByClass: (value: string) => HTMLElement;
  getAllByClass: (value: string) => HTMLElement[];
  getByClass: (value: string) => HTMLElement;
  findAllByClass: (
    args_0: string,
    args_1?: undefined,
    args_2?: import('@testing-library/react').waitForOptions
  ) => Promise<HTMLElement[]>;
  findByClass: (
    args_0: string,
    args_1?: undefined,
    args_2?: import('@testing-library/react').waitForOptions
  ) => Promise<HTMLElement>;
  getByLabelText: (<T extends HTMLElement = HTMLElement>(
    id: import('@testing-library/react').Matcher,
    options?: queryHelpers.SelectorMatcherOptions
  ) => T) &
    ((id: import('@testing-library/react').Matcher, options?: queryHelpers.SelectorMatcherOptions) => HTMLElement);
  getAllByLabelText: (<T_1 extends HTMLElement = HTMLElement>(
    id: import('@testing-library/react').Matcher,
    options?: queryHelpers.SelectorMatcherOptions
  ) => T_1[]) &
    ((id: import('@testing-library/react').Matcher, options?: queryHelpers.SelectorMatcherOptions) => HTMLElement[]);
  queryByLabelText: (<T_2 extends HTMLElement = HTMLElement>(
    id: import('@testing-library/react').Matcher,
    options?: queryHelpers.SelectorMatcherOptions
  ) => T_2) &
    ((id: import('@testing-library/react').Matcher, options?: queryHelpers.SelectorMatcherOptions) => HTMLElement);
  queryAllByLabelText: (<T_3 extends HTMLElement = HTMLElement>(
    id: import('@testing-library/react').Matcher,
    options?: queryHelpers.SelectorMatcherOptions
  ) => T_3[]) &
    ((id: import('@testing-library/react').Matcher, options?: queryHelpers.SelectorMatcherOptions) => HTMLElement[]);
  findByLabelText: (<T_4 extends HTMLElement = HTMLElement>(
    id: import('@testing-library/react').Matcher,
    options?: queryHelpers.SelectorMatcherOptions,
    waitForElementOptions?: import('@testing-library/react').waitForOptions
  ) => Promise<T_4>) &
    ((
      id: import('@testing-library/react').Matcher,
      options?: queryHelpers.SelectorMatcherOptions,
      waitForElementOptions?: import('@testing-library/react').waitForOptions
    ) => Promise<HTMLElement>);
  findAllByLabelText: (<T_5 extends HTMLElement = HTMLElement>(
    id: import('@testing-library/react').Matcher,
    options?: queryHelpers.SelectorMatcherOptions,
    waitForElementOptions?: import('@testing-library/react').waitForOptions
  ) => Promise<T_5[]>) &
    ((
      id: import('@testing-library/react').Matcher,
      options?: queryHelpers.SelectorMatcherOptions,
      waitForElementOptions?: import('@testing-library/react').waitForOptions
    ) => Promise<HTMLElement[]>);
  getByPlaceholderText: (<T_6 extends HTMLElement = HTMLElement>(
    id: import('@testing-library/react').Matcher,
    options?: import('@testing-library/react').MatcherOptions
  ) => T_6) &
    ((
      id: import('@testing-library/react').Matcher,
      options?: import('@testing-library/react').MatcherOptions
    ) => HTMLElement);
  getAllByPlaceholderText: (<T_7 extends HTMLElement = HTMLElement>(
    id: import('@testing-library/react').Matcher,
    options?: import('@testing-library/react').MatcherOptions
  ) => T_7[]) &
    ((
      id: import('@testing-library/react').Matcher,
      options?: import('@testing-library/react').MatcherOptions
    ) => HTMLElement[]);
  queryByPlaceholderText: (<T_8 extends HTMLElement = HTMLElement>(
    id: import('@testing-library/react').Matcher,
    options?: import('@testing-library/react').MatcherOptions
  ) => T_8) &
    ((
      id: import('@testing-library/react').Matcher,
      options?: import('@testing-library/react').MatcherOptions
    ) => HTMLElement);
  queryAllByPlaceholderText: (<T_9 extends HTMLElement = HTMLElement>(
    id: import('@testing-library/react').Matcher,
    options?: import('@testing-library/react').MatcherOptions
  ) => T_9[]) &
    ((
      id: import('@testing-library/react').Matcher,
      options?: import('@testing-library/react').MatcherOptions
    ) => HTMLElement[]);
  findByPlaceholderText: (<T_10 extends HTMLElement = HTMLElement>(
    id: import('@testing-library/react').Matcher,
    options?: import('@testing-library/react').MatcherOptions,
    waitForElementOptions?: import('@testing-library/react').waitForOptions
  ) => Promise<T_10>) &
    ((
      id: import('@testing-library/react').Matcher,
      options?: import('@testing-library/react').MatcherOptions,
      waitForElementOptions?: import('@testing-library/react').waitForOptions
    ) => Promise<HTMLElement>);
  findAllByPlaceholderText: (<T_11 extends HTMLElement = HTMLElement>(
    id: import('@testing-library/react').Matcher,
    options?: import('@testing-library/react').MatcherOptions,
    waitForElementOptions?: import('@testing-library/react').waitForOptions
  ) => Promise<T_11[]>) &
    ((
      id: import('@testing-library/react').Matcher,
      options?: import('@testing-library/react').MatcherOptions,
      waitForElementOptions?: import('@testing-library/react').waitForOptions
    ) => Promise<HTMLElement[]>);
  getByText: (<T_12 extends HTMLElement = HTMLElement>(
    id: import('@testing-library/react').Matcher,
    options?: queryHelpers.SelectorMatcherOptions
  ) => T_12) &
    ((id: import('@testing-library/react').Matcher, options?: queryHelpers.SelectorMatcherOptions) => HTMLElement);
  getAllByText: (<T_13 extends HTMLElement = HTMLElement>(
    id: import('@testing-library/react').Matcher,
    options?: queryHelpers.SelectorMatcherOptions
  ) => T_13[]) &
    ((id: import('@testing-library/react').Matcher, options?: queryHelpers.SelectorMatcherOptions) => HTMLElement[]);
  queryByText: (<T_14 extends HTMLElement = HTMLElement>(
    id: import('@testing-library/react').Matcher,
    options?: queryHelpers.SelectorMatcherOptions
  ) => T_14) &
    ((id: import('@testing-library/react').Matcher, options?: queryHelpers.SelectorMatcherOptions) => HTMLElement);
  queryAllByText: (<T_15 extends HTMLElement = HTMLElement>(
    id: import('@testing-library/react').Matcher,
    options?: queryHelpers.SelectorMatcherOptions
  ) => T_15[]) &
    ((id: import('@testing-library/react').Matcher, options?: queryHelpers.SelectorMatcherOptions) => HTMLElement[]);
  findByText: (<T_16 extends HTMLElement = HTMLElement>(
    id: import('@testing-library/react').Matcher,
    options?: queryHelpers.SelectorMatcherOptions,
    waitForElementOptions?: import('@testing-library/react').waitForOptions
  ) => Promise<T_16>) &
    ((
      id: import('@testing-library/react').Matcher,
      options?: queryHelpers.SelectorMatcherOptions,
      waitForElementOptions?: import('@testing-library/react').waitForOptions
    ) => Promise<HTMLElement>);
  findAllByText: (<T_17 extends HTMLElement = HTMLElement>(
    id: import('@testing-library/react').Matcher,
    options?: queryHelpers.SelectorMatcherOptions,
    waitForElementOptions?: import('@testing-library/react').waitForOptions
  ) => Promise<T_17[]>) &
    ((
      id: import('@testing-library/react').Matcher,
      options?: queryHelpers.SelectorMatcherOptions,
      waitForElementOptions?: import('@testing-library/react').waitForOptions
    ) => Promise<HTMLElement[]>);
  getByAltText: (<T_18 extends HTMLElement = HTMLElement>(
    id: import('@testing-library/react').Matcher,
    options?: import('@testing-library/react').MatcherOptions
  ) => T_18) &
    ((
      id: import('@testing-library/react').Matcher,
      options?: import('@testing-library/react').MatcherOptions
    ) => HTMLElement);
  getAllByAltText: (<T_19 extends HTMLElement = HTMLElement>(
    id: import('@testing-library/react').Matcher,
    options?: import('@testing-library/react').MatcherOptions
  ) => T_19[]) &
    ((
      id: import('@testing-library/react').Matcher,
      options?: import('@testing-library/react').MatcherOptions
    ) => HTMLElement[]);
  queryByAltText: (<T_20 extends HTMLElement = HTMLElement>(
    id: import('@testing-library/react').Matcher,
    options?: import('@testing-library/react').MatcherOptions
  ) => T_20) &
    ((
      id: import('@testing-library/react').Matcher,
      options?: import('@testing-library/react').MatcherOptions
    ) => HTMLElement);
  queryAllByAltText: (<T_21 extends HTMLElement = HTMLElement>(
    id: import('@testing-library/react').Matcher,
    options?: import('@testing-library/react').MatcherOptions
  ) => T_21[]) &
    ((
      id: import('@testing-library/react').Matcher,
      options?: import('@testing-library/react').MatcherOptions
    ) => HTMLElement[]);
  findByAltText: (<T_22 extends HTMLElement = HTMLElement>(
    id: import('@testing-library/react').Matcher,
    options?: import('@testing-library/react').MatcherOptions,
    waitForElementOptions?: import('@testing-library/react').waitForOptions
  ) => Promise<T_22>) &
    ((
      id: import('@testing-library/react').Matcher,
      options?: import('@testing-library/react').MatcherOptions,
      waitForElementOptions?: import('@testing-library/react').waitForOptions
    ) => Promise<HTMLElement>);
  findAllByAltText: (<T_23 extends HTMLElement = HTMLElement>(
    id: import('@testing-library/react').Matcher,
    options?: import('@testing-library/react').MatcherOptions,
    waitForElementOptions?: import('@testing-library/react').waitForOptions
  ) => Promise<T_23[]>) &
    ((
      id: import('@testing-library/react').Matcher,
      options?: import('@testing-library/react').MatcherOptions,
      waitForElementOptions?: import('@testing-library/react').waitForOptions
    ) => Promise<HTMLElement[]>);
  getByTitle: (<T_24 extends HTMLElement = HTMLElement>(
    id: import('@testing-library/react').Matcher,
    options?: import('@testing-library/react').MatcherOptions
  ) => T_24) &
    ((
      id: import('@testing-library/react').Matcher,
      options?: import('@testing-library/react').MatcherOptions
    ) => HTMLElement);
  getAllByTitle: (<T_25 extends HTMLElement = HTMLElement>(
    id: import('@testing-library/react').Matcher,
    options?: import('@testing-library/react').MatcherOptions
  ) => T_25[]) &
    ((
      id: import('@testing-library/react').Matcher,
      options?: import('@testing-library/react').MatcherOptions
    ) => HTMLElement[]);
  queryByTitle: (<T_26 extends HTMLElement = HTMLElement>(
    id: import('@testing-library/react').Matcher,
    options?: import('@testing-library/react').MatcherOptions
  ) => T_26) &
    ((
      id: import('@testing-library/react').Matcher,
      options?: import('@testing-library/react').MatcherOptions
    ) => HTMLElement);
  queryAllByTitle: (<T_27 extends HTMLElement = HTMLElement>(
    id: import('@testing-library/react').Matcher,
    options?: import('@testing-library/react').MatcherOptions
  ) => T_27[]) &
    ((
      id: import('@testing-library/react').Matcher,
      options?: import('@testing-library/react').MatcherOptions
    ) => HTMLElement[]);
  findByTitle: (<T_28 extends HTMLElement = HTMLElement>(
    id: import('@testing-library/react').Matcher,
    options?: import('@testing-library/react').MatcherOptions,
    waitForElementOptions?: import('@testing-library/react').waitForOptions
  ) => Promise<T_28>) &
    ((
      id: import('@testing-library/react').Matcher,
      options?: import('@testing-library/react').MatcherOptions,
      waitForElementOptions?: import('@testing-library/react').waitForOptions
    ) => Promise<HTMLElement>);
  findAllByTitle: (<T_29 extends HTMLElement = HTMLElement>(
    id: import('@testing-library/react').Matcher,
    options?: import('@testing-library/react').MatcherOptions,
    waitForElementOptions?: import('@testing-library/react').waitForOptions
  ) => Promise<T_29[]>) &
    ((
      id: import('@testing-library/react').Matcher,
      options?: import('@testing-library/react').MatcherOptions,
      waitForElementOptions?: import('@testing-library/react').waitForOptions
    ) => Promise<HTMLElement[]>);
  getByDisplayValue: (<T_30 extends HTMLElement = HTMLElement>(
    id: import('@testing-library/react').Matcher,
    options?: import('@testing-library/react').MatcherOptions
  ) => T_30) &
    ((
      id: import('@testing-library/react').Matcher,
      options?: import('@testing-library/react').MatcherOptions
    ) => HTMLElement);
  getAllByDisplayValue: (<T_31 extends HTMLElement = HTMLElement>(
    id: import('@testing-library/react').Matcher,
    options?: import('@testing-library/react').MatcherOptions
  ) => T_31[]) &
    ((
      id: import('@testing-library/react').Matcher,
      options?: import('@testing-library/react').MatcherOptions
    ) => HTMLElement[]);
  queryByDisplayValue: (<T_32 extends HTMLElement = HTMLElement>(
    id: import('@testing-library/react').Matcher,
    options?: import('@testing-library/react').MatcherOptions
  ) => T_32) &
    ((
      id: import('@testing-library/react').Matcher,
      options?: import('@testing-library/react').MatcherOptions
    ) => HTMLElement);
  queryAllByDisplayValue: (<T_33 extends HTMLElement = HTMLElement>(
    id: import('@testing-library/react').Matcher,
    options?: import('@testing-library/react').MatcherOptions
  ) => T_33[]) &
    ((
      id: import('@testing-library/react').Matcher,
      options?: import('@testing-library/react').MatcherOptions
    ) => HTMLElement[]);
  findByDisplayValue: (<T_34 extends HTMLElement = HTMLElement>(
    id: import('@testing-library/react').Matcher,
    options?: import('@testing-library/react').MatcherOptions,
    waitForElementOptions?: import('@testing-library/react').waitForOptions
  ) => Promise<T_34>) &
    ((
      id: import('@testing-library/react').Matcher,
      options?: import('@testing-library/react').MatcherOptions,
      waitForElementOptions?: import('@testing-library/react').waitForOptions
    ) => Promise<HTMLElement>);
  findAllByDisplayValue: (<T_35 extends HTMLElement = HTMLElement>(
    id: import('@testing-library/react').Matcher,
    options?: import('@testing-library/react').MatcherOptions,
    waitForElementOptions?: import('@testing-library/react').waitForOptions
  ) => Promise<T_35[]>) &
    ((
      id: import('@testing-library/react').Matcher,
      options?: import('@testing-library/react').MatcherOptions,
      waitForElementOptions?: import('@testing-library/react').waitForOptions
    ) => Promise<HTMLElement[]>);
  getByRole: (<T_36 extends HTMLElement = HTMLElement>(
    role: import('@testing-library/react').ByRoleMatcher,
    options?: queries.ByRoleOptions
  ) => T_36) &
    ((role: import('@testing-library/react').ByRoleMatcher, options?: queries.ByRoleOptions) => HTMLElement);
  getAllByRole: (<T_37 extends HTMLElement = HTMLElement>(
    role: import('@testing-library/react').ByRoleMatcher,
    options?: queries.ByRoleOptions
  ) => T_37[]) &
    ((role: import('@testing-library/react').ByRoleMatcher, options?: queries.ByRoleOptions) => HTMLElement[]);
  queryByRole: (<T_38 extends HTMLElement = HTMLElement>(
    role: import('@testing-library/react').ByRoleMatcher,
    options?: queries.ByRoleOptions
  ) => T_38) &
    ((role: import('@testing-library/react').ByRoleMatcher, options?: queries.ByRoleOptions) => HTMLElement);
  queryAllByRole: (<T_39 extends HTMLElement = HTMLElement>(
    role: import('@testing-library/react').ByRoleMatcher,
    options?: queries.ByRoleOptions
  ) => T_39[]) &
    ((role: import('@testing-library/react').ByRoleMatcher, options?: queries.ByRoleOptions) => HTMLElement[]);
  findByRole: (<T_40 extends HTMLElement = HTMLElement>(
    role: import('@testing-library/react').ByRoleMatcher,
    options?: queries.ByRoleOptions,
    waitForElementOptions?: import('@testing-library/react').waitForOptions
  ) => Promise<T_40>) &
    ((
      role: import('@testing-library/react').ByRoleMatcher,
      options?: queries.ByRoleOptions,
      waitForElementOptions?: import('@testing-library/react').waitForOptions
    ) => Promise<HTMLElement>);
  findAllByRole: (<T_41 extends HTMLElement = HTMLElement>(
    role: import('@testing-library/react').ByRoleMatcher,
    options?: queries.ByRoleOptions,
    waitForElementOptions?: import('@testing-library/react').waitForOptions
  ) => Promise<T_41[]>) &
    ((
      role: import('@testing-library/react').ByRoleMatcher,
      options?: queries.ByRoleOptions,
      waitForElementOptions?: import('@testing-library/react').waitForOptions
    ) => Promise<HTMLElement[]>);
  getByTestId: (<T_42 extends HTMLElement = HTMLElement>(
    id: import('@testing-library/react').Matcher,
    options?: import('@testing-library/react').MatcherOptions
  ) => T_42) &
    ((
      id: import('@testing-library/react').Matcher,
      options?: import('@testing-library/react').MatcherOptions
    ) => HTMLElement);
  getAllByTestId: (<T_43 extends HTMLElement = HTMLElement>(
    id: import('@testing-library/react').Matcher,
    options?: import('@testing-library/react').MatcherOptions
  ) => T_43[]) &
    ((
      id: import('@testing-library/react').Matcher,
      options?: import('@testing-library/react').MatcherOptions
    ) => HTMLElement[]);
  queryByTestId: (<T_44 extends HTMLElement = HTMLElement>(
    id: import('@testing-library/react').Matcher,
    options?: import('@testing-library/react').MatcherOptions
  ) => T_44) &
    ((
      id: import('@testing-library/react').Matcher,
      options?: import('@testing-library/react').MatcherOptions
    ) => HTMLElement);
  queryAllByTestId: (<T_45 extends HTMLElement = HTMLElement>(
    id: import('@testing-library/react').Matcher,
    options?: import('@testing-library/react').MatcherOptions
  ) => T_45[]) &
    ((
      id: import('@testing-library/react').Matcher,
      options?: import('@testing-library/react').MatcherOptions
    ) => HTMLElement[]);
  findByTestId: (<T_46 extends HTMLElement = HTMLElement>(
    id: import('@testing-library/react').Matcher,
    options?: import('@testing-library/react').MatcherOptions,
    waitForElementOptions?: import('@testing-library/react').waitForOptions
  ) => Promise<T_46>) &
    ((
      id: import('@testing-library/react').Matcher,
      options?: import('@testing-library/react').MatcherOptions,
      waitForElementOptions?: import('@testing-library/react').waitForOptions
    ) => Promise<HTMLElement>);
  findAllByTestId: (<T_47 extends HTMLElement = HTMLElement>(
    id: import('@testing-library/react').Matcher,
    options?: import('@testing-library/react').MatcherOptions,
    waitForElementOptions?: import('@testing-library/react').waitForOptions
  ) => Promise<T_47[]>) &
    ((
      id: import('@testing-library/react').Matcher,
      options?: import('@testing-library/react').MatcherOptions,
      waitForElementOptions?: import('@testing-library/react').waitForOptions
    ) => Promise<HTMLElement[]>);
  debug: (
    element?: Element | HTMLDocument | (Element | HTMLDocument)[],
    maxLength?: number,
    options?: pf.PrettyFormatOptions
  ) => void;
  logTestingPlaygroundURL: (element?: Element | HTMLDocument) => string;
};
declare let user: import('@testing-library/user-event/dist/types/setup/setup').UserEvent;
declare const customRender: (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'queries'>
) => import('@testing-library/react').RenderResult<typeof queries, HTMLElement, HTMLElement>;
export * from '@testing-library/react';
export { user };
export { customWithin as within };
export { customScreen as screen };
export { customRender as render };
