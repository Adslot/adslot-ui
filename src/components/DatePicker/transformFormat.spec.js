import moment from 'moment';
import { format } from 'date-fns';
import { transform, clearCache } from './transformFormat';

describe('<DatePicker />', () => {
  const date = new Date('2021-11-10T02:42:58.797Z');

  beforeEach(() => {
    clearCache();
  });

  it('should format common format correctly', () => {
    const formats = [
      'YYYY-MM-DD',
      'YYYY-MM-DDThh:mm',
      'YYYY-MM-DD hh:mm:ss:SSS',
      'DD MMM YY',
      'MMM YYYY',
      'MMMM YYYY',
      'DD/MM/YYYY HH:mm:ss',
      'DD MMM YY [at] HH:mm:ssA [UTC]Z',
      'ddd, DD MMM YYYY HH:mm:ss [GMT]',
      'MMM-YYYY',
      'MMM DD YYYY',
      'DD MMM YYYY',
    ];

    for (const fmt of formats) {
      expect(moment(date).format(fmt)).toEqual(format(date, transform(fmt)));
    }
  });

  it('should escape correctly', () => {
    const formats = ['[foobar]', '[YYYY-MM-DD]', '\\foo', '\\\\foo', '[\\foobar]', '\\[foobar\\]', '[[foobar]]', "''"];

    for (const fmt of formats) {
      expect(moment(date).format(fmt)).toEqual(format(date, transform(fmt)));
    }
  });

  it('should return nil if input is nil', () => {
    expect(transform(undefined)).toBeUndefined();
    expect(transform(null)).toBeNull();
  });
});
