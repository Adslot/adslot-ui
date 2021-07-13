import React from 'react';
import { render, cleanup } from '@testing-library/react';
import ButtonGroup from './';
import Button from '../Button';

afterEach(cleanup);

describe('<ButtonGroup />', () => {
  it('should render Button Group', () => {
    const { queryByTestId } = render(
      <ButtonGroup>
        <Button>Test1</Button>
        <Button>Test2</Button>
      </ButtonGroup>
    );
    expect(queryByTestId('button-group-wrapper')).toBeInTheDocument();
  });

  it('should override child Button style', () => {
    const { queryAllByTestId } = render(
      <ButtonGroup theme="link" inverse>
        <Button theme="primary">Test1</Button>
        <Button inverse={false}>Test2</Button>
      </ButtonGroup>
    );
    expect(queryAllByTestId('button-wrapper')[0]).toHaveClass('btn-link');
    expect(queryAllByTestId('button-wrapper')[1]).toHaveClass('btn-inverse');
  });

  it('should disable child buttons', () => {
    const { queryAllByTestId } = render(
      <ButtonGroup disabled>
        <Button theme="primary">Test1</Button>
        <Button inverse={false}>Test2</Button>
      </ButtonGroup>
    );
    expect(queryAllByTestId('button-wrapper')[0]).toBeDisabled();
    expect(queryAllByTestId('button-wrapper')[1]).toBeDisabled();
  });

  it('should inject props to Button at any nested level', () => {
    const { getByTestId } = render(
      <ButtonGroup disabled size="large">
        <div>
          <div>foo</div>
          <Button theme="primary">Test1</Button>
        </div>
      </ButtonGroup>
    );
    expect(getByTestId('button-wrapper')).toBeDisabled();
  });

  it('should not crash when child is null', () => {
    const { queryByTestId } = render(
      <ButtonGroup disabled>
        <div />
        {null}
      </ButtonGroup>
    );
    expect(queryByTestId('button-group-wrapper')).toBeInTheDocument();
  });
});
