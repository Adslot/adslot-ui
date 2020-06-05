import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import Radio from '../Radio';
import RadioGroup from '.';

afterEach(cleanup);

describe('<RadioGroup />', () => {
  let props;

  beforeEach(() => {
    props = {
      id: 'radio-group-id',
      className: 'radio-group-custom-class',
      name: 'hobbies',
      value: 'badminton',
      onChange: jest.fn(),
      dts: 'radio-group-dts',
    };
  });

  it('should render with props', () => {
    const { getByTestId, queryAllByTestId } = render(
      <RadioGroup {...props}>
        <Radio label="Swimming" value="swimming" />
        <Radio label="Soccer" value="soccer" />
        <Radio label="Badminton" value="badminton" />
      </RadioGroup>
    );
    expect(queryAllByTestId('radio-group-wrapper')).toHaveLength(1);
    expect(getByTestId('radio-group-wrapper')).toHaveAttribute('id', 'radio-group-id');
    expect(getByTestId('radio-group-wrapper')).toHaveAttribute('data-test-selector', 'radio-group-dts');
    expect(queryAllByTestId('radio-wrapper')).toHaveLength(3);
  });

  it('should trigger props.onChange when selection changes', () => {
    const { queryAllByTestId } = render(
      <RadioGroup {...props}>
        <Radio label="Swimming" value="swimming" />
        <Radio label="Soccer" value="soccer" />
        <Radio label="Badminton" value="badminton" />
      </RadioGroup>
    );

    fireEvent.click(queryAllByTestId('radio-input')[0]);
    expect(props.onChange).toHaveBeenCalledTimes(1);
    expect(props.onChange).toHaveBeenCalledWith('swimming');
  });

  it('should call Radio props.onChange when selecting that radio button', () => {
    const onSwimmingChange = jest.fn();
    const onSoccerChange = jest.fn();

    const { queryAllByTestId } = render(
      <RadioGroup {...props}>
        <Radio label="Swimming" value="swimming" onChange={onSwimmingChange} />
        <Radio label="Soccer" value="soccer" onChange={onSoccerChange} />
        <Radio label="Badminton" value="badminton" />
      </RadioGroup>
    );

    fireEvent.click(queryAllByTestId('radio-input')[0]);
    expect(onSwimmingChange).toHaveBeenCalledTimes(1);
    expect(onSoccerChange).toHaveBeenCalledTimes(0);
    expect(props.onChange).toHaveBeenCalledTimes(1);
  });
});
