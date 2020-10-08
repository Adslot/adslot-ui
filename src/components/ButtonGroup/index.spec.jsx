import React from 'react';
import { render, cleanup } from '@testing-library/react';
import ButtonGroup from './';
import Button from '../Button';

afterEach(cleanup);

describe('<ButtonGroup />', () => {
  it('should render Button Group', () => {
    const { queryAllByTestId } = render(
      <ButtonGroup>
        <Button>Test1</Button>
        <Button>Test2</Button>
      </ButtonGroup>
    );
    expect(queryAllByTestId('button-group-wrapper')).toHaveLength(1);
  });

  it('should override child Button style', () => {
    const { queryAllByTestId } = render(
      <ButtonGroup bsStyle="link" inverse>
        <Button bsStyle="primary">Test1</Button>
        <Button inverse={false}>Test2</Button>
      </ButtonGroup>
    );
    expect(queryAllByTestId('button-wrapper')[0]).toHaveClass('btn-link');
    expect(queryAllByTestId('button-wrapper')[1]).toHaveClass('btn-inverse');
  });

  it('should disable child buttons', () => {
    const { queryAllByTestId } = render(
      <ButtonGroup disabled>
        <Button bsStyle="primary">Test1</Button>
        <Button inverse={false}>Test2</Button>
      </ButtonGroup>
    );
    expect(queryAllByTestId('button-wrapper')[0]).toBeDisabled();
    expect(queryAllByTestId('button-wrapper')[1]).toBeDisabled();
  });

  it('should inject props to Button at any nested level', () => {
    const { getByTestId } = render(
      <ButtonGroup disabled bsSize="large">
        <div>
          <div>foo</div>
          <Button bsStyle="primary">Test1</Button>
        </div>
      </ButtonGroup>
    );
    expect(getByTestId('button-wrapper')).toBeDisabled();
  });

  it('should not crash when child is null', () => {
    const { queryAllByTestId } = render(
      <ButtonGroup disabled>
        <div />
        {null}
      </ButtonGroup>
    );
    expect(queryAllByTestId('button-group-wrapper')).toHaveLength(1);
  });
});
