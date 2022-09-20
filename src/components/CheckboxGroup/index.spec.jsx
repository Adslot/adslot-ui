import React from 'react';
import { render, cleanup, fireEvent, queryByAttribute } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Checkbox from '../Checkbox';
import CheckboxGroup from '.';

afterEach(cleanup);
const getByDts = queryByAttribute.bind(null, 'data-test-selector');

describe('<CheckboxGroup />', () => {
  let props;

  beforeEach(() => {
    props = {
      name: 'checkbox-group-name',
      dts: 'checkbox-group-dts',
      id: 'checkbox-group-id',
      className: 'checkbox-class',
      value: 'checkbox-value-1',
      onChange: jest.fn(),
    };
  });

  it('should trigger `props.onChange` when the checkbox is clicked', () => {
    const { getAllByTestId } = render(
      <CheckboxGroup {...props} type="checkbox" value={['checkbox-value-1']}>
        <Checkbox value="checkbox-value-1" label="Checkbox 1" dts="test-1" />
        <Checkbox value="checkbox-value-2" label="Checkbox 2" dts="test-2" />
      </CheckboxGroup>
    );
    fireEvent.click(getAllByTestId('checkbox-input')[1]);
    expect(props.onChange).toHaveBeenCalledTimes(1);
  });

  it('should use getIsChecked function', () => {
    const getIsCheckedMock = jest.fn();
    const { getAllByTestId } = render(
      <CheckboxGroup {...props} type="checkbox" value={['checkbox-value-1']} getIsChecked={getIsCheckedMock}>
        <Checkbox value="checkbox-value-1" label="Checkbox 1" dts="test-1" />
        <Checkbox value="checkbox-value-2" label="Checkbox 2" dts="test-2" />
        <Checkbox value="checkbox-value-3" label="Checkbox 3" dts="test-3" />
      </CheckboxGroup>
    );

    fireEvent.click(getAllByTestId('checkbox-input')[1]);
    expect(getIsCheckedMock).toHaveBeenCalled();
  });

  it('should work for partial checkbox state', () => {
    const mockoOnChange = jest.fn();

    const getIsChecked = (v) => {
      return v === 'checkbox-value-2' ? 'partial' : false;
    };

    const { container } = render(
      <CheckboxGroup
        {...props}
        type="checkbox"
        value={['checkbox-value-1']}
        getIsChecked={getIsChecked}
        onChange={mockoOnChange}
      >
        <Checkbox value="checkbox-value-1" label="Checkbox 1" dts="test-1" />
        <Checkbox value="checkbox-value-2" label="Checkbox 2" dts="test-2" />
        <Checkbox value="checkbox-value-3" label="Checkbox 3" dts="test-3" />
      </CheckboxGroup>
    );

    const checkbox2 = getByDts(container, 'test-2');

    checkbox2.focus();
    expect(checkbox2).toBePartiallyChecked();
    userEvent.keyboard('[Enter]');

    expect(mockoOnChange).toHaveBeenCalledTimes(1);
    expect(mockoOnChange).toHaveBeenCalledWith(
      ['checkbox-value-1', 'checkbox-value-2'],
      'checkbox-group-name',
      'checkbox-value-2'
    );
  });

  it('should trigger onChange with checkbox type', () => {
    const { container } = render(
      <CheckboxGroup {...props} type="checkbox" value={['checkbox-value-1']}>
        <Checkbox value="checkbox-value-1" label="Checkbox 1" dts="test-1" />
        <Checkbox value="checkbox-value-2" label="Checkbox 2" dts="test-2" />
        <Checkbox value="checkbox-value-3" label="Checkbox 3" dts="test-3" />
      </CheckboxGroup>
    );
    const checkbox1 = getByDts(container, 'test-1');
    userEvent.tab();
    expect(checkbox1).toHaveFocus();
    expect(checkbox1).toBeChecked();
    userEvent.tab();
    userEvent.keyboard('[Enter]');
    expect(props.onChange).toHaveBeenCalledTimes(1);
  });

  it('should render checkbox group with props', () => {
    const { container, getAllByTestId } = render(
      <CheckboxGroup {...props} value={['checkbox-value-1']}>
        <Checkbox disabled value="checkbox-value-1" label="Checkbox 1" dts="test-1" />
        <Checkbox value="checkbox-value-2" label="Checkbox 2" dts="test-2" />
      </CheckboxGroup>
    );
    expect(getByDts(container, 'test-1')).toHaveTextContent('Checkbox 1');
    expect(getByDts(container, 'test-2')).toHaveTextContent('Checkbox 2');

    expect(getAllByTestId('checkbox-input')[0]).toHaveAttribute('type', 'checkbox');
    expect(getAllByTestId('checkbox-input')[0]).toHaveAttribute('name', 'checkbox-group-name');
    expect(getAllByTestId('checkbox-input')[0]).toBeChecked();
  });

  it('should render with props', () => {
    const { getByTestId, queryAllByTestId } = render(
      <CheckboxGroup name="movies" value={['terminator', 'predator']} className="custom-class" onChange={jest.fn()}>
        <Checkbox label="The Terminator" value="terminator" />
        <Checkbox label="Predator" value="predator" />
        <Checkbox label="The Sound of Music" value="soundofmusic" />
      </CheckboxGroup>
    );

    expect(getByTestId('checkbox-group')).toHaveClass('custom-class');
    expect(queryAllByTestId('checkbox')).toHaveLength(3);
  });

  it('should render checkbox with icons and text', () => {
    const { getByText } = render(
      <CheckboxGroup
        variant="box"
        name="movies"
        value={['terminator', 'predator']}
        className="custom-class"
        onChange={jest.fn()}
      >
        <Checkbox value="value" label="label" icon="Icon" />
        <Checkbox value="value-2" label="label" text="text description" />
      </CheckboxGroup>
    );
    expect(getByText('text description')).toBeInTheDocument();
    expect(getByText('Icon')).toBeInTheDocument();
  });

  it('should override checkbox items prop', () => {
    const { getByTestId } = render(
      <CheckboxGroup variant="box" name="movies" value={['terminator', 'predator']} onChange={jest.fn()}>
        <Checkbox value="value" label="label" variant="default" />
      </CheckboxGroup>
    );
    expect(getByTestId('checkbox')).toHaveClass('aui--checkbox-box');
    expect(getByTestId('checkbox')).not.toHaveClass('aui--checkbox-default');
  });

  it('should handle checkbox change events when adding selection', () => {
    const onChangeGroup = jest.fn();
    const { queryAllByTestId } = render(
      <CheckboxGroup name="movies" value={['terminator', 'predator']} onChange={onChangeGroup}>
        <Checkbox label="The Terminator" value="terminator" />
        <Checkbox label="Predator" value="predator" />
        <Checkbox label="The Sound of Music" value="soundofmusic" />
      </CheckboxGroup>
    );

    fireEvent.click(queryAllByTestId('checkbox-input')[0]);
    expect(onChangeGroup).toHaveBeenCalledTimes(1);
    expect(onChangeGroup).toHaveBeenCalledWith(['predator'], 'movies', 'terminator');
  });

  it('should handle checkbox change events when removing selection', () => {
    const onChangeGroup = jest.fn();
    const { queryAllByTestId } = render(
      <CheckboxGroup name="movies" value={['terminator', 'predator']} onChange={onChangeGroup}>
        <Checkbox label="The Terminator" value="terminator" />
        <Checkbox label="Predator" value="predator" />
        <Checkbox label="The Sound of Music" value="soundofmusic" />
      </CheckboxGroup>
    );

    fireEvent.click(queryAllByTestId('checkbox-input')[2]);
    expect(onChangeGroup).toHaveBeenCalledTimes(1);
    expect(onChangeGroup).toHaveBeenCalledWith(['terminator', 'predator', 'soundofmusic'], 'movies', 'soundofmusic');
  });

  it('should return null if there is a boolean child', () => {
    console.error = jest.fn();
    const { queryByTestId } = render(
      <CheckboxGroup name="movies" value={['test']} onChange={jest.fn()}>
        {false && <Checkbox label="The Terminator" value="terminator" />}
        <Checkbox label="Predator" value="predator" />
      </CheckboxGroup>
    );

    expect(queryByTestId('checkbox-group')).toBeInTheDocument();
    expect(console.error).toHaveBeenCalledTimes(0);
  });
});
