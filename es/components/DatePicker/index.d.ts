import * as React from 'react';
import { ReactDatePickerProps } from 'react-datepicker';
import { Moment } from 'moment';

export interface DatePickerProps {
  selected?: Moment | Date | null;
  onChange?(date: Moment | Date | null): void;
  startDate?: Moment | Date | null;
  endDate?: Moment | Date | null;
  minDate?: Moment | Date | null;
  maxDate?: Moment | Date | null;
  disableInlineEditing?: boolean;
  dts?: string;
  /**
   * "dateFormat" prop is using momentjs format tokens.
   * set this prop to "true" to enable unicode tokens.
   * read more https://git.io/fxCyr
   */
  disableMomentFormat?: boolean;
}

declare const DatePicker: React.ForwardRefExoticComponent<
  React.PropsWithoutRef<DatePickerProps & Omit<ReactDatePickerProps, keyof DatePickerProps>> &
    React.RefAttributes<((...args: any[]) => any) | Element>
>;

export default DatePicker;
