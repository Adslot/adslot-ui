import React from 'react';
import { render, screen, user } from 'testing';
import Radio from '../Radio';
import RadioGroup from '.';

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
    render(
      <RadioGroup {...props}>
        <Radio label="Swimming" value="swimming" />
        <Radio label="Soccer" value="soccer" />
        <Radio label="Badminton" value="badminton" />
      </RadioGroup>
    );
    expect(screen.getByTestId('radio-group-wrapper')).toBeInTheDocument();
    expect(screen.getByTestId('radio-group-wrapper')).toHaveAttribute('id', 'radio-group-id');
    expect(screen.getByTestId('radio-group-wrapper')).toHaveAttribute('data-test-selector', 'radio-group-dts');
    expect(screen.getAllByTestId('radio-wrapper')).toHaveLength(3);

    expect(screen.getAllByTestId('radio-input')[0]).toHaveAttribute('type', 'radio');
    expect(screen.getAllByTestId('radio-input')[0]).toHaveAttribute('name', 'hobbies');
    expect(screen.getAllByTestId('radio-input')[2]).toBeChecked();
  });

  it('should trigger props.onChange when selection changes', async () => {
    render(
      <RadioGroup {...props}>
        <Radio label="Swimming" value="swimming" />
        <Radio label="Soccer" value="soccer" />
        <Radio label="Badminton" value="badminton" />
      </RadioGroup>
    );

    await user.click(screen.getAllByTestId('radio-input')[0]);
    expect(props.onChange).toHaveBeenCalledTimes(1);
    expect(props.onChange).toHaveBeenCalledWith('swimming');
  });

  it('should render radio with icons and text', () => {
    render(
      <RadioGroup {...props} variant="box">
        <Radio label="Swimming" value="swimming" icon="Icon" />
        <Radio label="Soccer" value="soccer" text="text description" />
      </RadioGroup>
    );
    expect(screen.getByText('text description')).toBeInTheDocument();
    expect(screen.getByText('Icon')).toBeInTheDocument();
  });

  it('should display horizontally with the orientation prop', () => {
    render(
      <RadioGroup {...props} orientation="horizontal">
        <Radio label="Swimming" value="swimming" />
        <Radio label="Soccer" value="soccer" />
        <Radio label="Badminton" value="badminton" />
      </RadioGroup>
    );
    expect(screen.getAllByTestId('radio-group-wrapper')[0]).toHaveAttribute('aria-orientation', 'horizontal');
  });

  it('should trigger `props.onChange` when the radio button is clicked', async () => {
    render(
      <RadioGroup {...props}>
        <Radio label="Swimming" value="swimming" dts="test-1" />
        <Radio label="Soccer" value="soccer" dts="test-2" />
        <Radio label="Badminton" value="badminton" dts="test-3" />
      </RadioGroup>
    );
    await user.click(screen.getAllByTestId('radio-input')[1]);
    expect(props.onChange).toHaveBeenCalledTimes(1);
  });

  it('should trigger `props.onChange` when the radio button is focussed and arrow key is pressed', async () => {
    render(
      <RadioGroup orientation="horizontal" {...props} value="swimming">
        <Radio label="Swimming" value="swimming" dts="test-1" />
        <Radio label="Soccer" value="soccer" dts="test-2" />
      </RadioGroup>
    );

    await user.tab();
    expect(screen.getByDts('test-1')).toHaveFocus();
    await user.keyboard('[ArrowRight]');
    expect(props.onChange).toHaveBeenCalledTimes(1);
    expect(screen.getByDts('test-2')).toHaveFocus();
    await user.keyboard('[ArrowUp][ArrowDown]');
    expect(props.onChange).toHaveBeenCalledTimes(1);
  });

  it('should loop through radio items when focussed', async () => {
    render(
      <RadioGroup orientation="horizontal" {...props} value="swimming">
        <Radio label="Swimming" value="swimming" dts="test-1" />
        <Radio label="Soccer" value="soccer" dts="test-2" />
      </RadioGroup>
    );
    const radio1 = screen.getByDts('test-1');
    await user.keyboard('[ArrowDown]');
    expect(props.onChange).toHaveBeenCalledTimes(0);
    await user.tab();
    await user.keyboard('asdf');
    expect(radio1).toHaveFocus();
    expect(radio1).toBeChecked();

    await user.keyboard('[ArrowRight][ArrowRight]');
    expect(props.onChange).toHaveBeenCalledTimes(2);
    expect(radio1).toHaveFocus();

    await user.keyboard('[ArrowLeft][ArrowLeft]');
    expect(props.onChange).toHaveBeenCalledTimes(4);
    expect(radio1).toHaveFocus();
  });

  it('should loop through radio items and skip disabled', async () => {
    render(
      <RadioGroup orientation="horizontal" {...props} value="soccer">
        <Radio disabled label="Swimming" value="swimming" dts="test-1" />
        <Radio label="Soccer" value="soccer" dts="test-2" />
        <Radio label="Badminton" value="badminton" dts="test-3" />
      </RadioGroup>
    );

    const radio2 = screen.getByDts('test-2');
    await user.tab();
    expect(radio2).toHaveFocus();

    await user.keyboard('[ArrowRight][ArrowRight][ArrowLeft][ArrowLeft]');
    expect(props.onChange).toHaveBeenCalledTimes(4);
    expect(radio2).toHaveFocus();
  });

  it('should allow other children', async () => {
    render(
      <RadioGroup {...props} value="radio-value-3">
        <Radio value="radio-value-1" label="Radio 1" dts="test-1" />
        <div className="divider" />
        <Radio value="radio-value-2" label="Radio 2" dts="test-2" />
      </RadioGroup>
    );
    const radio1 = screen.getByDts('test-1');
    const radio2 = screen.getByDts('test-2');
    radio1.focus();
    await user.keyboard('[ArrowDown]');
    expect(radio2).toHaveFocus();
  });

  it('should work with vertical orientation', async () => {
    render(
      <RadioGroup {...props} orientation="vertical" value="swimming">
        <Radio label="Swimming" value="swimming" dts="test-1" />
        <Radio disabled label="Soccer" value="soccer" dts="test-2" />
        <Radio label="Badminton" value="badminton" dts="test-3" />
      </RadioGroup>
    );
    const radio1 = screen.getByDts('test-1');

    expect(radio1).toBeChecked();
    await user.tab();
    await user.keyboard('[ArrowDown][ArrowDown][ArrowUp][ArrowUp]');
    expect(props.onChange).toHaveBeenCalledTimes(4);
    expect(radio1).toHaveFocus();
    await user.keyboard('[ArrowLeft][ArrowRight]');
    expect(props.onChange).toHaveBeenCalledTimes(4);
  });
});
