import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Avatar from '.';

afterEach(cleanup);

describe('<Avatar />', () => {
  it('should render with defaults', () => {
    const { getByTestId, queryByTestId } = render(<Avatar />);
    expect(getByTestId('avatar-wrapper')).toHaveClass('avatar-component');
    expect(getByTestId('avatar-wrapper')).toHaveAttribute('title', ' ');
    expect(queryByTestId('avatar-image')).toBeNull();
    expect(getByTestId('avatar-initials')).toHaveClass('avatar-component-initials');
    expect(getByTestId('avatar-initials')).toHaveTextContent('');
  });

  it('should render with names given', () => {
    const { getByTestId, queryByTestId } = render(<Avatar givenName="John" surname="Doe" />);
    expect(getByTestId('avatar-wrapper')).toHaveClass('avatar-component');
    expect(getByTestId('avatar-wrapper')).toHaveAttribute('title', 'John Doe');
    expect(queryByTestId('avatar-image')).toBeNull();
    expect(getByTestId('avatar-initials')).toHaveClass('avatar-component-initials');
    expect(getByTestId('avatar-initials')).toHaveTextContent('JD');
  });

  it('should render with different color', () => {
    const { getByTestId, queryByTestId } = render(<Avatar givenName="John" surname="Doe" color="blue" />);
    expect(getByTestId('avatar-wrapper')).toHaveClass('avatar-component avatar-component-blue');
    expect(getByTestId('avatar-wrapper')).toHaveAttribute('title', 'John Doe');
    expect(queryByTestId('avatar-image')).toBeNull();
    expect(getByTestId('avatar-initials')).toHaveClass('avatar-component-initials');
    expect(getByTestId('avatar-initials')).toHaveTextContent('JD');
  });

  it('should render with avatar', () => {
    const { getByTestId } = render(<Avatar givenName="John" surname="Doe" image="//avatar.com" />);
    expect(getByTestId('avatar-wrapper')).toHaveClass('avatar-component');
    expect(getByTestId('avatar-wrapper')).toHaveAttribute('title', 'John Doe');
    expect(getByTestId('avatar-image')).toHaveClass('avatar-component-image');
    expect(getByTestId('avatar-image')).toHaveAttribute('src', '//avatar.com');
    expect(getByTestId('avatar-initials')).toHaveClass('avatar-component-initials');
    expect(getByTestId('avatar-initials')).toHaveTextContent('JD');
  });

  it('should render with default title of givenName surname', () => {
    const { getByTestId } = render(<Avatar color="blue" givenName="Firstname" surname="Surname" />);
    expect(getByTestId('avatar-wrapper')).toHaveAttribute('title', 'Firstname Surname');
  });

  it('should render with custom title property when tooltip with custom text supplied', () => {
    const { getByTestId } = render(
      <Avatar color="blue" givenName="Firstname" surname="Surname" tooltip="Name of logged-in user" />
    );
    expect(getByTestId('avatar-wrapper')).toHaveAttribute('title', 'Name of logged-in user');
  });

  it('should render with empty title property when tooltip with empty text supplied', () => {
    const { getByTestId } = render(<Avatar color="blue" givenName="Firstname" surname="Surname" tooltip="" />);
    expect(getByTestId('avatar-wrapper')).toHaveAttribute('title', '');
  });
});
