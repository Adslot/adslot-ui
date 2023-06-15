import React from 'react';
import { render, screen } from 'testing';
import Alert from '.';

it('should render default info type', () => {
  render(
    <Alert>
      <div />
    </Alert>
  );
  expect(screen.getByTestId('alert-wrapper')).toHaveClass('alert-component alert-component-info');
});

it('should render success type', () => {
  render(
    <Alert type="success">
      <div />
    </Alert>
  );
  expect(screen.getByTestId('alert-wrapper')).toHaveClass('alert-component alert-component-success');
});

it('should render warning type', () => {
  render(
    <Alert type="warning">
      <div />
    </Alert>
  );
  expect(screen.getByTestId('alert-wrapper')).toHaveClass('alert-component alert-component-warning');
});

it('should render danger type', () => {
  render(
    <Alert type="danger">
      <div />
    </Alert>
  );
  expect(screen.getByTestId('alert-wrapper')).toHaveClass('alert-component alert-component-danger');
});
