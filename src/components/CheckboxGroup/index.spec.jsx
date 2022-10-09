import React from 'react';
import { render, cleanup, fireEvent, queryByAttribute, getByTestId as getByTestIdGlobal } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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
      <CheckboxGroup {...props} value={['checkbox-value-1']}>
        <CheckboxGroup.Item value="checkbox-value-1" label="Checkbox 1" dts="test-1" />
        <CheckboxGroup.Item value="checkbox-value-2" label="Checkbox 2" dts="test-2" />
      </CheckboxGroup>
    );
    fireEvent.click(getAllByTestId('checkbox-input')[1]);
    expect(props.onChange).toHaveBeenCalledTimes(1);
  });

  it('should use getIsChecked function', () => {
    const getIsCheckedMock = jest.fn();
    const { getAllByTestId } = render(
      <CheckboxGroup {...props} value={['checkbox-value-1']} getIsChecked={getIsCheckedMock}>
        <CheckboxGroup.Item value="checkbox-value-1" label="Checkbox 1" dts="test-1" />
        <CheckboxGroup.Item value="checkbox-value-2" label="Checkbox 2" dts="test-2" />
        <CheckboxGroup.Item value="checkbox-value-3" label="Checkbox 3" dts="test-3" />
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
      <CheckboxGroup {...props} value={['checkbox-value-1']} getIsChecked={getIsChecked} onChange={mockoOnChange}>
        <CheckboxGroup.Item value="checkbox-value-1" label="Checkbox 1" dts="test-1" />
        <CheckboxGroup.Item value="checkbox-value-2" label="Checkbox 2" dts="test-2" />
        <CheckboxGroup.Item value="checkbox-value-3" label="Checkbox 3" dts="test-3" />
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
      <CheckboxGroup {...props} value={['checkbox-value-1']}>
        <CheckboxGroup.Item value="checkbox-value-1" label="Checkbox 1" dts="test-1" />
        <CheckboxGroup.Item value="checkbox-value-2" label="Checkbox 2" dts="test-2" />
        <CheckboxGroup.Item value="checkbox-value-3" label="Checkbox 3" dts="test-3" />
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
        <CheckboxGroup.Item disabled value="checkbox-value-1" label="Checkbox 1" dts="test-1" />
        <CheckboxGroup.Item value="checkbox-value-2" label="Checkbox 2" dts="test-2" />
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
        <CheckboxGroup.Item label="The Terminator" value="terminator" />
        <CheckboxGroup.Item label="Predator" value="predator" />
        <CheckboxGroup.Item label="The Sound of Music" value="soundofmusic" />
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
        <CheckboxGroup.Item value="value" label="label" icon="Icon" />
        <CheckboxGroup.Item value="value-2" label="label" text="text description" />
      </CheckboxGroup>
    );
    expect(getByText('text description')).toBeInTheDocument();
    expect(getByText('Icon')).toBeInTheDocument();
  });

  it('should override checkbox items prop', () => {
    jest.spyOn(console, 'error').mockReturnValue();
    expect(() =>
      render(
        <CheckboxGroup variant="box" name="movies" value={['terminator', 'predator']} onChange={jest.fn()}>
          <CheckboxGroup.Item value="value" label="label" variant="default" />
        </CheckboxGroup>
      )
    ).toThrow('AdslotUI CheckboxGroup.Item: variant will be overridden by CheckboxGroup variant');
  });

  it('should handle checkbox change events when adding selection', () => {
    const onChangeGroup = jest.fn();
    const { queryAllByTestId } = render(
      <CheckboxGroup name="movies" value={['terminator', 'predator']} onChange={onChangeGroup}>
        <CheckboxGroup.Item label="The Terminator" value="terminator" />
        <CheckboxGroup.Item label="Predator" value="predator" />
        <CheckboxGroup.Item label="The Sound of Music" value="soundofmusic" />
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
        <CheckboxGroup.Item label="The Terminator" value="terminator" />
        <CheckboxGroup.Item label="Predator" value="predator" />
        <CheckboxGroup.Item label="The Sound of Music" value="soundofmusic" />
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
        {false && <CheckboxGroup.Item label="The Terminator" value="terminator" />}
        <CheckboxGroup.Item label="Predator" value="predator" />
      </CheckboxGroup>
    );

    expect(queryByTestId('checkbox-group')).toBeInTheDocument();
    expect(console.error).toHaveBeenCalledTimes(0);
  });

  it('should be able to check all options when none is checked', () => {
    const onChange = jest.fn();
    const { container } = render(
      <CheckboxGroup name="movies" value={[]} onChange={onChange}>
        <CheckboxGroup.All label="All" dts="target" />
        <CheckboxGroup.Item label="The Terminator" value="terminator" />
        <CheckboxGroup.Item label="Predator" value="predator" />
        <CheckboxGroup.Item label="The Sound of Music" value="soundofmusic" />
      </CheckboxGroup>
    );

    const checkbox = getByTestIdGlobal(getByDts(container, 'target'), 'checkbox-input');
    fireEvent.click(checkbox);
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(['terminator', 'predator', 'soundofmusic'], 'movies');
  });

  it('should be able to uncheck all options when all are checked', () => {
    const onChange = jest.fn();
    const { container } = render(
      <CheckboxGroup name="movies" value={['terminator', 'predator', 'soundofmusic']} onChange={onChange}>
        <CheckboxGroup.All label="All" dts="target" />
        <CheckboxGroup.Item label="The Terminator" value="terminator" />
        <CheckboxGroup.Item label="Predator" value="predator" />
        <CheckboxGroup.Item label="The Sound of Music" value="soundofmusic" />
      </CheckboxGroup>
    );

    const checkbox = getByTestIdGlobal(getByDts(container, 'target'), 'checkbox-input');
    fireEvent.click(checkbox);
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith([], 'movies');
  });

  it('should be able to uncheck all options when some is checked', () => {
    const onChange = jest.fn();
    const { container } = render(
      <CheckboxGroup name="movies" value={['terminator']} onChange={onChange}>
        <CheckboxGroup.All label="All" dts="target" />
        <CheckboxGroup.Item label="The Terminator" value="terminator" />
        <CheckboxGroup.Item label="Predator" value="predator" />
        <CheckboxGroup.Item label="The Sound of Music" value="soundofmusic" />
      </CheckboxGroup>
    );

    const checkbox = getByTestIdGlobal(getByDts(container, 'target'), 'checkbox-input');
    fireEvent.click(checkbox);
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(['terminator', 'predator', 'soundofmusic'], 'movies');
  });

  it('should work with nested checkbox group', () => {
    const onChange = jest.fn();
    const { container } = render(
      <CheckboxGroup name="movies" value={[]} onChange={onChange}>
        <CheckboxGroup.Item label="The Terminator" value="terminator" />
        <CheckboxGroup.Item label="Predator" value="predator" />
        <CheckboxGroup.Item label="The Sound of Music" value="soundofmusic" />

        <CheckboxGroup>
          <CheckboxGroup.Item label="Lung Cancer Late" dts="target" value="Lung Cancer Late" />
          <CheckboxGroup.Item label="Lung Cancer Early" value="Lung Cancer Early" />
        </CheckboxGroup>
      </CheckboxGroup>
    );

    const checkbox = getByTestIdGlobal(getByDts(container, 'target'), 'checkbox-input');
    fireEvent.click(checkbox);
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(['Lung Cancer Late'], 'movies', 'Lung Cancer Late');
  });

  it('should be able to select nested all', () => {
    const onChange = jest.fn();
    const { container } = render(
      <CheckboxGroup name="movies" value={[]} onChange={onChange}>
        <CheckboxGroup.Item label="The Terminator" value="terminator" />
        <CheckboxGroup.Item label="Predator" value="predator" />
        <CheckboxGroup.Item label="The Sound of Music" value="soundofmusic" />

        <CheckboxGroup>
          <CheckboxGroup.All label="All" dts="target" />
          <CheckboxGroup.Item label="Lung Cancer Late" value="Lung Cancer Late" />
          <CheckboxGroup.Item label="Lung Cancer Early" value="Lung Cancer Early" />
        </CheckboxGroup>
      </CheckboxGroup>
    );

    const checkbox = getByTestIdGlobal(getByDts(container, 'target'), 'checkbox-input');
    fireEvent.click(checkbox);
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(['Lung Cancer Late', 'Lung Cancer Early'], 'movies');
  });
});
