import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Alert from '.';

afterEach(cleanup);

describe('<Alert />', () => {
  it('should render default info type', () => {
    const { getByTestId } = render(
      <Alert>
        <div />
      </Alert>
    );
    expect(getByTestId('alert-wrapper')).toHaveClass('alert-component alert-component-info');
    expect(getByTestId('alert-wrapper').firstChild).toMatchInlineSnapshot(`<div />`);
  });
  it('should render success type', () => {
    const { getByTestId } = render(
      <Alert type="success">
        <div />
      </Alert>
    );
    expect(getByTestId('alert-wrapper')).toHaveClass('alert-component alert-component-success');
  });

  it('should render warning type', () => {
    const { getByTestId } = render(
      <Alert type="warning">
        <div />
      </Alert>
    );
    expect(getByTestId('alert-wrapper')).toHaveClass('alert-component alert-component-warning');
  });

  it('should render danger type', () => {
    const { getByTestId } = render(
      <Alert type="danger">
        <div />
      </Alert>
    );
    expect(getByTestId('alert-wrapper')).toHaveClass('alert-component alert-component-danger');
  });
});
