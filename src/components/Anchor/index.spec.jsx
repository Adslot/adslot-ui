import _ from 'lodash';
import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import Anchor from './';

afterEach(cleanup);

describe('<Anchor />', () => {
  let props = {};

  beforeEach(() => {
    props = {
      href: 'www.some.url.com',
      onClick: jest.fn(),
    };
  });

  it('should render with default props', () => {
    const { getByRole } = render(<Anchor {...props} />);
    expect(getByRole('link')).toHaveAttribute('href', 'www.some.url.com');
    expect(getByRole('link')).toHaveClass('aui--anchor aui-default aui-inverse');
  });

  it('should trigger `props.onClick` when clicking on the component', () => {
    jest.spyOn(console, 'error').mockImplementation(_.noop);
    const { getByRole } = render(<Anchor {...props} />);
    fireEvent.click(getByRole('link'));
    expect(props.onClick).toHaveBeenCalledTimes(1);
  });

  it('should throw if using color on link variant', () => {
    console.error = (err) => {
      throw new Error(err);
    };
    expect(() =>
      render(
        <Anchor {...props} variant="link" color="success" size="large">
          Test
        </Anchor>
      )
    ).toThrow('AdslotUI Anchor: anchors with the "link" variant do not inherit size and color properties.');
  });

  it('should throw when round with child or no icon', () => {
    console.error = (err) => {
      throw new Error(err);
    };
    expect(() =>
      render(
        <Anchor {...props} round>
          Test
        </Anchor>
      )
    ).toThrow('AdslotUI Anchor: round can only be used with an icon and no children.');
  });

  it('should apply round anchor when icon exists and no child', () => {
    const { getByTestId } = render(
      <Anchor {...props} color="primary" aria-label="icon" round icon={<div>icon</div>} />
    );
    expect(getByTestId('anchor-wrapper')).toHaveClass('aui--anchor aui-primary aui-round');
  });

  it('should throw when an aria-label is required', () => {
    console.error = (err) => {
      throw new Error(err);
    };
    expect(() => render(<Anchor {...props} icon={<div />} />)).toThrow(
      'AdslotUI Anchor: an aria-label is required on icon anchors.'
    );
  });

  it('should throw when an href is not used', () => {
    console.error = (err) => {
      throw new Error(err);
    };
    expect(() => render(<Anchor icon={<div />} />)).toThrow(
      'AdslotUI Anchor: should not be used without an href. Use <Button/> for onClick-only actions.'
    );
  });
});
