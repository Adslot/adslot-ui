import * as React from 'react';
import { DatePickerProps as LibProps } from 'react-datepicker';
import { Moment } from 'moment';

export type DatePickerProps = Omit<
  LibProps,
  'onSelect' | 'excludeScrollbar' | 'onChange' | 'selected' | 'startDate' | 'endDate' | 'minDate' | 'maxDate'
> & {
  onSelect?: LibProps['onSelect'];
  excludeScrollbar?: LibProps['excludeScrollbar'];
  disableInlineEditing?: boolean;
  /**
   * "dateFormat" prop is using momentjs format tokens.
   * set this prop to "true" to enable unicode tokens.
   * read more https://git.io/fxCyr
   */
  disableMomentFormat?: boolean;
  dateFormat?: string;
  dts?: string;
  onChange: (
    date: Moment | Date | null,
    event?: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>
  ) => void;
  selected?: Moment | Date | null;
  startDate?: Moment | Date | null;
  endDate?: Moment | Date | null;
  minDate?: Moment | Date | null;
  maxDate?: Moment | Date | null;
};

declare const DatePicker: React.FC<DatePickerProps>;

export default DatePicker;
