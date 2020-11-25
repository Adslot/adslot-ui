import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import ReactDatePicker from 'react-datepicker';
import moment from 'moment';
import './styles.scss';

const adslotDatePickerPropTypes = {
  disableInlineEditing: PropTypes.bool,
};

const momentToDate = date => (!date || date instanceof Date ? date : date.toDate());

const withMoment = DatePickerComponent =>
  React.forwardRef(({ selected, onChange, startDate, endDate, minDate, maxDate, ...props }, ref) => {
    const isDate = selected instanceof Date;
    const handleChange = React.useCallback(
      newDate => {
        onChange && onChange(!isDate && newDate ? moment(newDate) : newDate);
      },
      [isDate, onChange]
    );
    return (
      <DatePickerComponent
        ref={ref}
        {...props}
        selected={momentToDate(selected)}
        startDate={momentToDate(startDate)}
        endDate={momentToDate(endDate)}
        minDate={momentToDate(minDate)}
        maxDate={momentToDate(maxDate)}
        onChange={handleChange}
      />
    );
  });

const RefHack = React.forwardRef(({ originalCustomInputRef, originalCustomInput, _datePickerRef, ...props }, ref) => {
  const _ref = React.useRef(null);
  React.useLayoutEffect(() => {
    if (typeof ref === 'function') ref(_ref.current);
    else if (typeof ref === 'object') ref.current = _ref.current;
    _datePickerRef(_ref.current);
    return () => {
      if (typeof ref === 'function') ref(_ref.current);
      else if (typeof ref === 'object') ref.current = null;
      _datePickerRef(null);
    };
  }, [_datePickerRef, ref, _ref]);
  return React.cloneElement(originalCustomInput, { ...props, [originalCustomInputRef]: _ref });
});

const DatePicker = withMoment(
  React.forwardRef(({ dts, disableInlineEditing, customInputRef, customInput, ...props }, ref) => {
    const handleDateChangeRaw = React.useCallback(event => {
      event.preventDefault();
    }, []);

    const datePickerProps = disableInlineEditing ? { onChangeRaw: handleDateChangeRaw } : {};

    return (
      <div data-testid="date-picker-wrapper" className="aui--date-picker" data-test-selector={dts}>
        <ReactDatePicker
          {..._.omit(props, _.keys(adslotDatePickerPropTypes))}
          {...datePickerProps}
          customInputRef="_datePickerRef"
          customInput={
            <RefHack
              ref={ref}
              originalCustomInputRef={customInputRef || 'ref'}
              originalCustomInput={customInput || <input type="text" />}
            />
          }
        />
      </div>
    );
  })
);

DatePicker.propTypes = { ...adslotDatePickerPropTypes };

DatePicker.defaultProps = {
  disableInlineEditing: false,
};

export default DatePicker;
