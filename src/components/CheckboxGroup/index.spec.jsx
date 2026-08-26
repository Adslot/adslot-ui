import React from 'react';
import { render, screen, within, user } from 'testing';
import CheckboxGroup from '.';
import invariant from '../../invariant';

jest.mock('../../invariant');

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

it('should trigger `props.onChange` when the checkbox is clicked', async () => {
  render(
    <CheckboxGroup {...props} value={['checkbox-value-1']}>
      <CheckboxGroup.Item value="checkbox-value-1" label="Checkbox 1" dts="test-1" />
      <CheckboxGroup.Item value="checkbox-value-2" label="Checkbox 2" dts="test-2" />
    </CheckboxGroup>
  );
  await user.click(screen.getAllByTestId('checkbox-input')[1]);
  expect(props.onChange).toHaveBeenCalledTimes(1);
});

it('should use getIsChecked function', async () => {
  const getIsCheckedMock = jest.fn();
  render(
    <CheckboxGroup {...props} value={['checkbox-value-1']} getIsChecked={getIsCheckedMock}>
      <CheckboxGroup.Item value="checkbox-value-1" label="Checkbox 1" dts="test-1" />
      <CheckboxGroup.Item value="checkbox-value-2" label="Checkbox 2" dts="test-2" />
      <CheckboxGroup.Item value="checkbox-value-3" label="Checkbox 3" dts="test-3" />
    </CheckboxGroup>
  );

  await user.click(screen.getAllByTestId('checkbox-input')[1]);
  expect(getIsCheckedMock).toHaveBeenCalled();
});

it('should work for partial checkbox state', async () => {
  const mockOnChange = jest.fn();
  const getIsChecked = (v) => {
    return v === 'checkbox-value-2' ? 'partial' : false;
  };

  render(
    <CheckboxGroup {...props} value={['checkbox-value-1']} getIsChecked={getIsChecked} onChange={mockOnChange}>
      <CheckboxGroup.All
        values={['checkbox-value-1', 'checkbox-value-2', 'checkbox-value-3']}
        label="Checkbox Parent"
        dts="test-p"
      />
      <CheckboxGroup.Item value="checkbox-value-1" label="Checkbox 1" dts="test-1" />
      <CheckboxGroup.Item value="checkbox-value-2" label="Checkbox 2" dts="test-2" />
      <CheckboxGroup.Item value="checkbox-value-3" label="Checkbox 3" dts="test-3" />
    </CheckboxGroup>
  );
  expect(screen.getByDts('test-p')).toBePartiallyChecked();

  const checkbox2 = screen.getByDts('test-2');

  checkbox2.focus();
  expect(checkbox2).toBePartiallyChecked();
  await user.keyboard('[Enter]');

  expect(mockOnChange).toHaveBeenCalledTimes(1);
  expect(mockOnChange).toHaveBeenCalledWith(
    ['checkbox-value-1', 'checkbox-value-2'],
    'checkbox-group-name',
    'checkbox-value-2'
  );
});

it('should trigger onChange with checkbox type', async () => {
  render(
    <CheckboxGroup {...props} value={['checkbox-value-1']}>
      <CheckboxGroup.Item value="checkbox-value-1" label="Checkbox 1" dts="test-1" />
      <CheckboxGroup.Item value="checkbox-value-2" label="Checkbox 2" dts="test-2" />
      <CheckboxGroup.Item value="checkbox-value-3" label="Checkbox 3" dts="test-3" />
    </CheckboxGroup>
  );
  const checkbox1 = screen.getByDts('test-1');
  await user.tab();
  expect(checkbox1).toHaveFocus();
  expect(checkbox1).toBeChecked();
  await user.tab();
  await user.keyboard('[Enter]');
  expect(props.onChange).toHaveBeenCalledTimes(1);
});

it('should render checkbox group with props', () => {
  render(
    <CheckboxGroup {...props} value={['checkbox-value-1']}>
      <CheckboxGroup.Item disabled value="checkbox-value-1" label="Checkbox 1" dts="test-1" />
      <CheckboxGroup.Item value="checkbox-value-2" label="Checkbox 2" dts="test-2" />
    </CheckboxGroup>
  );
  expect(screen.getByDts('test-1')).toHaveTextContent('Checkbox 1');
  expect(screen.getByDts('test-2')).toHaveTextContent('Checkbox 2');

  expect(screen.getAllByTestId('checkbox-input')[0]).toHaveAttribute('type', 'checkbox');
  expect(screen.getAllByTestId('checkbox-input')[0]).toHaveAttribute('name', 'checkbox-group-name');
  expect(screen.getAllByTestId('checkbox-input')[0]).toBeChecked();
});

it('should render with props', () => {
  render(
    <CheckboxGroup name="movies" value={['terminator', 'predator']} className="custom-class" onChange={jest.fn()}>
      <CheckboxGroup.Item label="The Terminator" value="terminator" />
      <CheckboxGroup.Item label="Predator" value="predator" />
      <CheckboxGroup.Item label="The Sound of Music" value="soundofmusic" />
    </CheckboxGroup>
  );

  expect(screen.getByTestId('checkbox-group')).toHaveClass('custom-class');
  expect(screen.getAllByTestId('checkbox')).toHaveLength(3);
});

it('should render checkbox with icons and text', () => {
  render(
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
  expect(screen.getByText('text description')).toBeInTheDocument();
  expect(screen.getByText('Icon')).toBeInTheDocument();
});

it('should override checkbox items prop', () => {
  render(
    <CheckboxGroup variant="box" name="movies" value={['terminator', 'predator']} onChange={jest.fn()}>
      <CheckboxGroup.Item value="value" label="label" variant="default" />
    </CheckboxGroup>
  );

  expect(invariant).toHaveBeenCalledWith(
    false,
    'CheckboxGroup.Item: variant will be overridden by CheckboxGroup variant'
  );
});

it('should handle checkbox change events when adding selection', async () => {
  const onChangeGroup = jest.fn();
  render(
    <CheckboxGroup name="movies" value={['terminator', 'predator']} onChange={onChangeGroup}>
      <CheckboxGroup.Item label="The Terminator" value="terminator" />
      <CheckboxGroup.Item label="Predator" value="predator" />
      <CheckboxGroup.Item label="The Sound of Music" value="soundofmusic" />
    </CheckboxGroup>
  );

  await user.click(screen.getAllByTestId('checkbox-input')[0]);
  expect(onChangeGroup).toHaveBeenCalledTimes(1);
  expect(onChangeGroup).toHaveBeenCalledWith(['predator'], 'movies', 'terminator');
});

it('should handle checkbox change events when removing selection', async () => {
  const onChangeGroup = jest.fn();
  render(
    <CheckboxGroup name="movies" value={['terminator', 'predator']} onChange={onChangeGroup}>
      <CheckboxGroup.Item label="The Terminator" value="terminator" />
      <CheckboxGroup.Item label="Predator" value="predator" />
      <CheckboxGroup.Item label="The Sound of Music" value="soundofmusic" />
    </CheckboxGroup>
  );

  await user.click(screen.getAllByTestId('checkbox-input')[2]);
  expect(onChangeGroup).toHaveBeenCalledTimes(1);
  expect(onChangeGroup).toHaveBeenCalledWith(['terminator', 'predator', 'soundofmusic'], 'movies', 'soundofmusic');
});

it('should return null if there is a boolean child', () => {
  render(
    <CheckboxGroup name="movies" value={['test']} onChange={jest.fn()}>
      {false && <CheckboxGroup.Item label="The Terminator" value="terminator" />}
      <CheckboxGroup.Item label="Predator" value="predator" />
    </CheckboxGroup>
  );

  expect(screen.getByTestId('checkbox-group')).toBeInTheDocument();
});

it('should be able to check all options when none is checked', async () => {
  const onChange = jest.fn();
  render(
    <CheckboxGroup name="movies" value={[]} onChange={onChange}>
      <CheckboxGroup.All label="All" dts="target" values={['terminator', 'predator', 'soundofmusic']} />
      <CheckboxGroup.Item label="The Terminator" value="terminator" />
      <CheckboxGroup.Item label="Predator" value="predator" />
      <CheckboxGroup.Item label="The Sound of Music" value="soundofmusic" />
    </CheckboxGroup>
  );

  const checkbox = within(screen.getByDts('target')).getByTestId('checkbox-input');
  await user.click(checkbox);
  expect(onChange).toHaveBeenCalledTimes(1);
  expect(onChange).toHaveBeenCalledWith(['terminator', 'predator', 'soundofmusic'], 'movies');
});

it('should be able to uncheck all options when all are checked', async () => {
  const onChange = jest.fn();
  render(
    <CheckboxGroup name="movies" value={['terminator', 'predator', 'soundofmusic']} onChange={onChange}>
      <CheckboxGroup.All label="All" dts="target" values={['terminator', 'predator', 'soundofmusic']} />
      <CheckboxGroup.Item label="The Terminator" value="terminator" />
      <CheckboxGroup.Item label="Predator" value="predator" />
      <CheckboxGroup.Item label="The Sound of Music" value="soundofmusic" />
    </CheckboxGroup>
  );

  const checkbox = within(screen.getByDts('target')).getByTestId('checkbox-input');
  await user.click(checkbox);
  expect(onChange).toHaveBeenCalledTimes(1);
  expect(onChange).toHaveBeenCalledWith([], 'movies');
});

it('should be able to uncheck all options when some is checked', async () => {
  const onChange = jest.fn();
  render(
    <CheckboxGroup name="movies" value={['terminator']} onChange={onChange}>
      <CheckboxGroup.All label="All" dts="target" values={['terminator', 'predator', 'soundofmusic']} />
      <CheckboxGroup.Item label="The Terminator" value="terminator" />
      <CheckboxGroup.Item label="Predator" value="predator" />
      <CheckboxGroup.Item label="The Sound of Music" value="soundofmusic" />
    </CheckboxGroup>
  );

  const checkbox = within(screen.getByDts('target')).getByTestId('checkbox-input');
  await user.click(checkbox);
  expect(onChange).toHaveBeenCalledTimes(1);
  expect(onChange).toHaveBeenCalledWith(['terminator', 'predator', 'soundofmusic'], 'movies');
});

it('should work with nested checkbox group', async () => {
  const onChange = jest.fn();
  render(
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

  const checkbox = within(screen.getByDts('target')).getByTestId('checkbox-input');
  await user.click(checkbox);
  expect(onChange).toHaveBeenCalledTimes(1);
  expect(onChange).toHaveBeenCalledWith(['Lung Cancer Late'], 'movies', 'Lung Cancer Late');
});

it('should be able to select nested all', async () => {
  const onChange = jest.fn();
  render(
    <CheckboxGroup name="movies" value={[]} onChange={onChange}>
      <CheckboxGroup.Item label="The Terminator" value="terminator" />
      <CheckboxGroup.Item label="Predator" value="predator" />
      <CheckboxGroup.Item label="The Sound of Music" value="soundofmusic" />

      <CheckboxGroup>
        <CheckboxGroup.All label="All" dts="target" values={['Lung Cancer Late', 'Lung Cancer Early']} />
        <CheckboxGroup.Item label="Lung Cancer Late" value="Lung Cancer Late" />
        <CheckboxGroup.Item label="Lung Cancer Early" value="Lung Cancer Early" />
      </CheckboxGroup>
    </CheckboxGroup>
  );

  const checkbox = within(screen.getByDts('target')).getByTestId('checkbox-input');
  await user.click(checkbox);
  expect(onChange).toHaveBeenCalledTimes(1);
  expect(onChange).toHaveBeenCalledWith(['Lung Cancer Late', 'Lung Cancer Early'], 'movies');
});

it('should work when there is an initial value', async () => {
  const onChange = jest.fn();
  render(
    <CheckboxGroup name="movies" value={['terminator']} onChange={onChange}>
      <CheckboxGroup.All label="All" dts="target" values={['terminator', 'predator', 'soundofmusic']} />
      <CheckboxGroup.Item label="The Terminator" value="terminator" />
      <CheckboxGroup.Item label="Predator" value="predator" />
      <CheckboxGroup.Item label="The Sound of Music" value="soundofmusic" />
    </CheckboxGroup>
  );

  const checkbox = within(screen.getByDts('target')).getByTestId('checkbox-input');
  expect(checkbox).toBeChecked();
});

it('should work when the values are updated', async () => {
  const Component = () => {
    const [value, setValue] = React.useState([]);
    const [allValues, setAllValues] = React.useState(['terminator', 'predator', 'soundofmusic']);

    return (
      <CheckboxGroup name="movies" value={value} onChange={setValue}>
        <CheckboxGroup.All label="All" values={allValues} />
        {allValues.map((item) => (
          <CheckboxGroup.Item key={item} label={item} value={item} />
        ))}
        <button
          data-testid="button"
          onClick={() => {
            setAllValues((prev) => [...prev, 'batman']);
          }}
        >
          Change All
        </button>
      </CheckboxGroup>
    );
  };

  render(<Component />);

  const items = screen.queryAllByTestId('checkbox');
  expect(items[0]).not.toBeChecked();

  await user.click(within(items[1]).getByTestId('checkbox-input'));
  await user.click(within(items[2]).getByTestId('checkbox-input'));
  await user.click(within(items[3]).getByTestId('checkbox-input'));
  expect(items[0]).toBeChecked();

  await user.click(screen.getByTestId('button'));

  // plugin does not support mixed state yet
  // eslint-disable-next-line jest-dom/prefer-checked
  expect(items[0]).toHaveAttribute('aria-checked', 'mixed');
});

it('should disable checkbox group all if all the items are disabled', () => {
  const onChange = jest.fn();
  render(
    <CheckboxGroup name="movies" value={[]} onChange={onChange}>
      <CheckboxGroup.All label="All" dts="target" values={['terminator', 'predator', 'soundofmusic']} />
      <CheckboxGroup.Item label="The Terminator" value="terminator" disabled />
      <CheckboxGroup.Item label="Predator" value="predator" disabled />
      <CheckboxGroup.Item label="The Sound of Music" value="soundofmusic" disabled />
    </CheckboxGroup>
  );
  const checkbox = within(screen.getByDts('target')).getByTestId('checkbox-input');
  expect(checkbox).toBeDisabled();
});

it('should not select disabled checkbox item', async () => {
  const onChange = jest.fn();
  render(
    <CheckboxGroup name="movies" value={[]} onChange={onChange}>
      <CheckboxGroup.All label="All" dts="target" values={['terminator', 'predator', 'soundofmusic']} />
      <CheckboxGroup.Item label="The Terminator" value="terminator" disabled />
      <CheckboxGroup.Item label="Predator" value="predator" />
      <CheckboxGroup.Item label="The Sound of Music" value="soundofmusic" />
    </CheckboxGroup>
  );

  const checkbox = within(screen.getByDts('target')).getByTestId('checkbox-input');
  await user.click(checkbox);
  expect(onChange).toHaveBeenCalledTimes(1);
  expect(onChange).toHaveBeenCalledWith(['predator', 'soundofmusic'], 'movies');
});

it('should work when re-render after disabled item is changed to non disabled', async () => {
  const Component = () => {
    const [value, setValue] = React.useState([]);
    const allValues = ['terminator', 'predator', 'soundofmusic'];
    const [checkboxDisabled, setCheckboxDisabled] = React.useState(true);

    const handleButtonClick = () => {
      setCheckboxDisabled(false);
    };

    return (
      <div>
        <button data-testid="button" onClick={handleButtonClick}>
          enable terminator
        </button>
        <CheckboxGroup name="movies" value={value} onChange={setValue}>
          <CheckboxGroup.All label="All" values={allValues} />
          {allValues.map((item) => (
            <CheckboxGroup.Item
              key={item}
              label={item}
              value={item}
              disabled={item === 'terminator' ? checkboxDisabled : false}
            />
          ))}
        </CheckboxGroup>
      </div>
    );
  };

  render(<Component />);

  await user.click(screen.getByTestId('button'));
  const items = screen.queryAllByTestId('checkbox');
  await user.click(within(items[0]).getByTestId('checkbox-input')); // click checkbox all
  expect(items[1]).toBeChecked(); // terminator is no longer disabled, so it should be checked
  expect(items[2]).toBeChecked(); // predator is checked
  expect(items[3]).toBeChecked(); // soundofmusic is checked
});

it('should work when non disabled values are updated', async () => {
  const Component = () => {
    const [value, setValue] = React.useState([]);
    const [allValues, setAllValues] = React.useState(['terminator', 'predator', 'soundofmusic']);

    return (
      <CheckboxGroup name="movies" value={value} onChange={setValue}>
        <CheckboxGroup.All label="All" values={allValues} />
        {allValues.map((item) => (
          <CheckboxGroup.Item key={item} label={item} value={item} disabled={item === 'terminator' ? true : false} />
        ))}
        <button
          data-testid="button"
          onClick={() => {
            setAllValues((prev) => [...prev, 'batman']);
          }}
        >
          Change All
        </button>
      </CheckboxGroup>
    );
  };

  render(<Component />);

  await user.click(screen.getByTestId('button'));
  const items = screen.queryAllByTestId('checkbox');
  await user.click(within(items[0]).getByTestId('checkbox-input')); // click checkbox all
  expect(items[1]).not.toBeChecked(); // terminator is disabled hence it should not be checked
  expect(items[2]).toBeChecked(); // predator is checked
  expect(items[3]).toBeChecked(); // soundofmusic is checked
  expect(items[4]).toBeChecked(); // batman is checked
});

it('should work when disabled values are updated', async () => {
  const Component = () => {
    const [value, setValue] = React.useState([]);
    const [allValues, setAllValues] = React.useState(['terminator', 'predator', 'soundofmusic']);

    return (
      <CheckboxGroup name="movies" value={value} onChange={setValue}>
        <CheckboxGroup.All label="All" values={allValues} />
        {allValues.map((item) => (
          <CheckboxGroup.Item key={item} label={item} value={item} disabled={item === 'batman' ? true : false} />
        ))}
        <button
          data-testid="button"
          onClick={() => {
            setAllValues((prev) => [...prev, 'batman']);
          }}
        >
          Change All
        </button>
      </CheckboxGroup>
    );
  };

  render(<Component />);

  await user.click(screen.getByTestId('button'));
  const items = screen.queryAllByTestId('checkbox');
  await user.click(within(items[0]).getByTestId('checkbox-input')); // click checkbox all
  expect(items[1]).toBeChecked(); // terminator is checked
  expect(items[2]).toBeChecked(); // predator is checked
  expect(items[3]).toBeChecked(); // soundofmusic is checked
  expect(items[4]).not.toBeChecked(); // batman is disabled hence it should not be checked
});

it('should work when children is updated', async () => {
  const Component = () => {
    const [value, setValue] = React.useState([]);
    const [allValues, setAllValues] = React.useState(['terminator', 'predator', 'soundofmusic']);

    return (
      <CheckboxGroup name="movies" value={value} onChange={setValue}>
        <CheckboxGroup.All label="All" values={allValues} />
        {allValues.map((item) => (
          <CheckboxGroup.Item key={item} label={item} value={item} disabled={item !== 'batman' ? true : false} />
        ))}
        <button
          data-testid="button"
          onClick={() => {
            setAllValues((prev) => [...prev, 'batman']);
          }}
        >
          Change All
        </button>
      </CheckboxGroup>
    );
  };

  render(<Component />);
  const items = screen.queryAllByTestId('checkbox');
  const checkboxAll = within(items[0]).getByTestId('checkbox-input');
  const checkboxItem1 = within(items[1]).getByTestId('checkbox-input');
  const checkboxItem2 = within(items[2]).getByTestId('checkbox-input');
  const checkboxItem3 = within(items[3]).getByTestId('checkbox-input');

  expect(checkboxAll).toBeDisabled(); // checkbox all is disabled
  expect(checkboxItem1).toBeDisabled(); // terminator is disabled
  expect(checkboxItem2).toBeDisabled(); // predator is disabled
  expect(checkboxItem3).toBeDisabled(); // soundofmusic is disabled

  await user.click(screen.getByTestId('button'));
  const updatedItems = screen.queryAllByTestId('checkbox');
  const updatedCheckboxAll = within(updatedItems[0]).getByTestId('checkbox-input');
  const updatedCheckboxItem1 = within(updatedItems[1]).getByTestId('checkbox-input');
  const updatedCheckboxItem2 = within(updatedItems[2]).getByTestId('checkbox-input');
  const updatedCheckboxItem3 = within(updatedItems[3]).getByTestId('checkbox-input');
  const updatedCheckboxItem4 = within(updatedItems[4]).getByTestId('checkbox-input');

  expect(updatedCheckboxAll).toBeEnabled(); // checkbox all is now enabled, since there is one enabled child
  expect(updatedCheckboxItem1).toBeDisabled(); // terminator is disabled
  expect(updatedCheckboxItem2).toBeDisabled(); // predator is disabled
  expect(updatedCheckboxItem3).toBeDisabled(); // soundofmusic is disabled
  expect(updatedCheckboxItem4).toBeEnabled(); // soundofmusic is disabled

  await user.click(checkboxAll); // click checkbox all
  expect(updatedItems[0]).toBeChecked(); // checkbox all is checked, since there is one enabled child
  expect(updatedItems[1]).not.toBeChecked(); // terminator is disabled
  expect(updatedItems[2]).not.toBeChecked(); // predator is disabled
  expect(updatedItems[3]).not.toBeChecked(); // soundofmusic is disabled
  expect(updatedItems[4]).toBeChecked(); // batman is checked
});
