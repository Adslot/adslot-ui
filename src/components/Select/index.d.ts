import * as React from 'react';
import { Props, OptionTypeBase, components, createFilter } from 'react-select';
import CreatableSelect from 'react-select/creatable';
import AsyncSelect from 'react-select/async';
import AsyncCreatableSelect from 'react-select/async-creatable';

export interface SelectProps {
  dts?: string;
  isInModal?: boolean;
}

declare const Select: (<
  OptionType extends OptionTypeBase = { label: string; value: string },
  IsMulti extends boolean = false
>(
  props: SelectProps & Props<OptionType, IsMulti>
) => React.ReactElement<any, any> | null) & {
  components: typeof components;
  Creatable: typeof CreatableSelect;
  Async: typeof AsyncSelect;
  AsyncCreatable: typeof AsyncCreatableSelect;
  createFilter: typeof createFilter;
};

export default Select;
