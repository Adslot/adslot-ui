import React from 'react';
import { render, screen, user } from 'testing';
import { invariant } from '../../lib/utils';
import Anchor from './';

describe('<Anchor />', () => {
  let props = {};

  beforeEach(() => {
    props = {
      href: 'www.some.url.com',
      onClick: jest.fn().mockImplementation((event) => event.preventDefault()),
    };
  });

  it('should render with default props', () => {
    render(<Anchor {...props} />);
    expect(screen.getByRole('link')).toHaveAttribute('href', 'www.some.url.com');
    expect(screen.getByRole('link')).toHaveClass('aui--anchor aui-default aui-inverse');
  });

  it('should trigger `props.onClick` when clicking on the component', async () => {
    render(<Anchor {...props} />);
    await user.click(screen.getByRole('link'));
    expect(props.onClick).toHaveBeenCalledTimes(1);
  });

  it('should throw if using color on link variant', () => {
    render(
      <Anchor {...props} variant="link" color="success" size="large">
        Test
      </Anchor>
    );

    expect(invariant).toHaveBeenCalledWith(
      false,
      'Anchor: anchors with the "link" variant do not inherit size and color properties.'
    );
  });

  it('should throw if using size on link variant', () => {
    render(
      <Anchor {...props} variant="link" size="large">
        Test
      </Anchor>
    );

    expect(invariant).toHaveBeenCalledWith(
      false,
      'Anchor: anchors with the "link" variant do not inherit size and color properties.'
    );
  });

  it('should throw when round with child or no icon', () => {
    render(
      <Anchor {...props} round>
        Test
      </Anchor>
    );
    expect(invariant).toHaveBeenCalledWith(false, 'Anchor: round can only be used with an icon and no children.');
  });

  it('should remove href when disabled', () => {
    render(<Anchor href="#" disabled />);
    expect(screen.getByTestId('anchor-wrapper')).toHaveClass('aui--anchor aui-default disabled');
  });

  it('should apply round anchor when icon exists and no child', () => {
    render(<Anchor {...props} color="primary" aria-label="icon" round icon={<div>icon</div>} />);
    expect(screen.getByTestId('anchor-wrapper')).toHaveClass('aui--anchor aui-primary aui-round');
  });

  it('should throw when an aria-label or aria-labelledby is required', () => {
    render(<Anchor {...props} icon={<div />} />);
    expect(invariant).toHaveBeenCalledWith(
      false,
      'Anchor: an aria-label or aria-labelledby is required on icon anchors.'
    );
  });
});
