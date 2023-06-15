import React from 'react';
import { render, screen } from 'testing';
import ButtonGroup from './';
import Button from '../Button';

it('should render Button Group', () => {
  render(
    <ButtonGroup>
      <Button>Test1</Button>
      <Button>Test2</Button>
    </ButtonGroup>
  );
  expect(screen.getByTestId('button-group-wrapper')).toBeInTheDocument();
});

it('should override child Button style', () => {
  render(
    <ButtonGroup color="success" variant="borderless">
      <Button color="primary">Test1</Button>
      <Button variant="inverse">Test2</Button>
    </ButtonGroup>
  );
  expect(screen.queryAllByTestId('button-wrapper')[0]).toHaveClass('aui-borderless aui-success');
  expect(screen.queryAllByTestId('button-wrapper')[1]).toHaveClass('aui-borderless aui-success');
});

it('should disable child buttons', () => {
  render(
    <ButtonGroup disabled>
      <Button color="primary">Test1</Button>
      <Button variant="inverse">Test2</Button>
    </ButtonGroup>
  );
  expect(screen.queryAllByTestId('button-wrapper')[0]).toBeDisabled();
  expect(screen.queryAllByTestId('button-wrapper')[1]).toBeDisabled();
});

it('should inject props to Button at any nested level', () => {
  render(
    <ButtonGroup disabled size="large">
      <div>
        <div>foo</div>
        <Button color="primary">Test1</Button>
      </div>
    </ButtonGroup>
  );
  expect(screen.getByTestId('button-wrapper')).toBeDisabled();
  expect(screen.getByTestId('button-wrapper')).toHaveClass('aui-large');
});

it('should not crash when child is null', () => {
  render(
    <ButtonGroup disabled>
      <div />
      {null}
    </ButtonGroup>
  );
  expect(screen.getByTestId('button-group-wrapper')).toBeInTheDocument();
});
