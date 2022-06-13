import React from 'react';
import { render, cleanup, fireEvent, queryByAttribute } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Radio from '../Radio';
import RadioGroup from '.';

afterEach(cleanup);
const getByDts = queryByAttribute.bind(null, 'data-test-selector');

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
    const { getByTestId, queryByTestId, queryAllByTestId } = render(
      <RadioGroup {...props}>
        <Radio label="Swimming" value="swimming" />
        <Radio label="Soccer" value="soccer" />
        <Radio label="Badminton" value="badminton" />
      </RadioGroup>
    );
    expect(queryByTestId('radio-group-wrapper')).toBeInTheDocument();
    expect(getByTestId('radio-group-wrapper')).toHaveAttribute('id', 'radio-group-id');
    expect(getByTestId('radio-group-wrapper')).toHaveAttribute('data-test-selector', 'radio-group-dts');
    expect(queryAllByTestId('radio-wrapper')).toHaveLength(3);

    expect(queryAllByTestId('radio-input')[0]).toHaveAttribute('type', 'radio');
    expect(queryAllByTestId('radio-input')[0]).toHaveAttribute('name', 'hobbies');
    expect(queryAllByTestId('radio-input')[2]).toBeChecked();
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

  it('should render radio with icons and text', () => {
    const { getByText } = render(
      <RadioGroup {...props} variant="box">
        <Radio label="Swimming" value="swimming" icon="Icon" />
        <Radio label="Soccer" value="soccer" text="text description" />
      </RadioGroup>
    );
    expect(getByText('text description')).toBeInTheDocument();
    expect(getByText('Icon')).toBeInTheDocument();
  });

  it('should display horizontally with the orientation prop', () => {
    const { queryAllByTestId } = render(
      <RadioGroup {...props} orientation="horizontal">
        <Radio label="Swimming" value="swimming" />
        <Radio label="Soccer" value="soccer" />
        <Radio label="Badminton" value="badminton" />
      </RadioGroup>
    );
    expect(queryAllByTestId('radio-group-wrapper')[0]).toHaveAttribute('aria-orientation', 'horizontal');
  });

  it('should trigger `props.onChange` when the radio button is clicked', () => {
    const { getAllByTestId } = render(
      <RadioGroup {...props}>
        <Radio label="Swimming" value="swimming" dts="test-1" />
        <Radio label="Soccer" value="soccer" dts="test-2" />
        <Radio label="Badminton" value="badminton" dts="test-3" />
      </RadioGroup>
    );
    fireEvent.click(getAllByTestId('radio-input')[1]);
    expect(props.onChange).toHaveBeenCalledTimes(1);
  });

  it('should trigger `props.onChange` when the radio button is focussed and arrow key is pressed', () => {
    const { container } = render(
      <RadioGroup orientation="horizontal" {...props} value="swimming">
        <Radio label="Swimming" value="swimming" dts="test-1" />
        <Radio label="Soccer" value="soccer" dts="test-2" />
      </RadioGroup>
    );

    userEvent.tab();
    expect(getByDts(container, 'test-1')).toHaveFocus();
    userEvent.keyboard('[ArrowRight]');
    expect(props.onChange).toHaveBeenCalledTimes(1);
    expect(getByDts(container, 'test-2')).toHaveFocus();
    userEvent.keyboard('[ArrowUp][ArrowDown]');
    expect(props.onChange).toHaveBeenCalledTimes(1);
  });

  it('should loop through radio items when focussed', () => {
    const { container } = render(
      <RadioGroup orientation="horizontal" {...props} value="swimming">
        <Radio label="Swimming" value="swimming" dts="test-1" />
        <Radio label="Soccer" value="soccer" dts="test-2" />
      </RadioGroup>
    );
    const radio1 = getByDts(container, 'test-1');
    fireEvent.keyDown(radio1, { key: 'ArrowDown' });
    expect(props.onChange).toHaveBeenCalledTimes(0);
    userEvent.tab();
    userEvent.keyboard('asdf');
    expect(radio1).toHaveFocus();
    expect(radio1).toBeChecked();

    userEvent.keyboard('[ArrowRight][ArrowRight]');
    expect(props.onChange).toHaveBeenCalledTimes(2);
    expect(radio1).toHaveFocus();

    userEvent.keyboard('[ArrowLeft][ArrowLeft]');
    expect(props.onChange).toHaveBeenCalledTimes(4);
    expect(radio1).toHaveFocus();
  });

  it('should loop through radio items and skip disabled', () => {
    const { container } = render(
      <RadioGroup orientation="horizontal" {...props} value="soccer">
        <Radio disabled label="Swimming" value="swimming" dts="test-1" />
        <Radio label="Soccer" value="soccer" dts="test-2" />
        <Radio label="Badminton" value="badminton" dts="test-3" />
      </RadioGroup>
    );

    const radio2 = getByDts(container, 'test-2');
    userEvent.tab();
    expect(radio2).toHaveFocus();

    userEvent.keyboard('[ArrowRight][ArrowRight][ArrowLeft][ArrowLeft]');
    expect(props.onChange).toHaveBeenCalledTimes(4);
    expect(radio2).toHaveFocus();
  });

  it('should allow other children', () => {
    const { container } = render(
      <RadioGroup {...props} value="radio-value-3">
        <Radio value="radio-value-1" label="Radio 1" dts="test-1" />
        <div className="divider" />
        <Radio value="radio-value-2" label="Radio 2" dts="test-2" />
      </RadioGroup>
    );
    const radio1 = getByDts(container, 'test-1');
    const radio2 = getByDts(container, 'test-2');
    radio1.focus();
    userEvent.keyboard('[ArrowDown]');
    expect(radio2).toHaveFocus();
  });

  it('should work with vertical orientation', () => {
    const { container } = render(
      <RadioGroup {...props} orientation="vertical" value="swimming">
        <Radio label="Swimming" value="swimming" dts="test-1" />
        <Radio disabled label="Soccer" value="soccer" dts="test-2" />
        <Radio label="Badminton" value="badminton" dts="test-3" />
      </RadioGroup>
    );
    const radio1 = getByDts(container, 'test-1');

    expect(radio1).toBeChecked();
    userEvent.tab();

    userEvent.keyboard('[ArrowDown][ArrowDown][ArrowUp][ArrowUp]');
    expect(props.onChange).toHaveBeenCalledTimes(4);
    expect(radio1).toHaveFocus();
    userEvent.keyboard('[ArrowLeft][ArrowRight]');
    expect(props.onChange).toHaveBeenCalledTimes(4);
  });
});
