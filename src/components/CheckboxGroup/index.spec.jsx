import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';

import Checkbox from '../Checkbox';

import CheckboxGroup from '.';

afterEach(cleanup);

describe('<CheckboxGroup />', () => {
  it('should render with props', () => {
    const { getByTestId, queryAllByTestId } = render(
      <CheckboxGroup name="movies" value={['terminator', 'predator']} className="custom-class" onChange={jest.fn()}>
        <Checkbox label="The Terminator" value="terminator" />
        <Checkbox label="Predator" value="predator" />
        <Checkbox label="The Sound of Music" value="soundofmusic" />
      </CheckboxGroup>
    );

    expect(getByTestId('checkbox-group-wrapper')).toHaveClass('custom-class');
    expect(queryAllByTestId('checkbox-wrapper')).toHaveLength(3);
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
    expect(onChangeGroup).toHaveBeenCalledWith(['predator'], 'movies');
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
    expect(onChangeGroup).toHaveBeenCalledWith(['terminator', 'predator', 'soundofmusic'], 'movies');
  });

  it('should print warning if child is not a Checkbox component', () => {
    console.error = jest.fn();
    render(
      <CheckboxGroup name="movies" value={['test']} onChange={jest.fn()}>
        <div>Not a Checkbox</div>
      </CheckboxGroup>
    );
    expect(console.error).toHaveBeenCalledWith("ERROR: CheckboxGroup's children should be an array of Checkbox");
  });
});
