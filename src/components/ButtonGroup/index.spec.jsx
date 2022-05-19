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
      <ButtonGroup color="success" variant="borderless">
        <Button color="primary">Test1</Button>
        <Button variant="inverse">Test2</Button>
      </ButtonGroup>
    );
    expect(queryAllByTestId('button-wrapper')[0]).toHaveClass('aui-borderless aui-success');
    expect(queryAllByTestId('button-wrapper')[1]).toHaveClass('aui-borderless aui-success');
  });

  it('should disable child buttons', () => {
    const { queryAllByTestId } = render(
      <ButtonGroup disabled>
        <Button color="primary">Test1</Button>
        <Button variant="inverse">Test2</Button>
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
          <Button color="primary">Test1</Button>
        </div>
      </ButtonGroup>
    );
    expect(getByTestId('button-wrapper')).toBeDisabled();
    expect(getByTestId('button-wrapper')).toHaveClass('aui-large');
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
