import React from 'react';
import { render, screen, user, act } from 'testing';
import useExclusivePopover, { ToolbarPopoverProvider } from './useExclusivePopover';

const Probe = ({ id, testId }) => {
  const { isOpen, toggle, close } = useExclusivePopover(id);
  return (
    <div>
      <span data-testid={`${testId}-open`}>{String(isOpen)}</span>
      <button data-testid={`${testId}-toggle`} type="button" onClick={toggle}>
        toggle
      </button>
      <button data-testid={`${testId}-close`} type="button" onClick={close}>
        close
      </button>
    </div>
  );
};

it('starts closed', () => {
  render(
    <ToolbarPopoverProvider>
      <Probe id="link" testId="link" />
    </ToolbarPopoverProvider>
  );
  expect(screen.getByTestId('link-open')).toHaveTextContent('false');
});

it('toggle opens then closes the popover for the same id', async () => {
  render(
    <ToolbarPopoverProvider>
      <Probe id="link" testId="link" />
    </ToolbarPopoverProvider>
  );
  await user.click(screen.getByTestId('link-toggle'));
  expect(screen.getByTestId('link-open')).toHaveTextContent('true');
  await user.click(screen.getByTestId('link-toggle'));
  expect(screen.getByTestId('link-open')).toHaveTextContent('false');
});

it('opening a second popover auto-closes the first', async () => {
  render(
    <ToolbarPopoverProvider>
      <Probe id="link" testId="link" />
      <Probe id="align" testId="align" />
    </ToolbarPopoverProvider>
  );
  await user.click(screen.getByTestId('link-toggle'));
  expect(screen.getByTestId('link-open')).toHaveTextContent('true');
  expect(screen.getByTestId('align-open')).toHaveTextContent('false');

  await user.click(screen.getByTestId('align-toggle'));
  expect(screen.getByTestId('link-open')).toHaveTextContent('false');
  expect(screen.getByTestId('align-open')).toHaveTextContent('true');
});

it('close clears whichever popover is open', async () => {
  render(
    <ToolbarPopoverProvider>
      <Probe id="link" testId="link" />
      <Probe id="align" testId="align" />
    </ToolbarPopoverProvider>
  );
  await user.click(screen.getByTestId('link-toggle'));
  await user.click(screen.getByTestId('align-close'));
  expect(screen.getByTestId('link-open')).toHaveTextContent('false');
});

it('falls back to local state when no provider is mounted', async () => {
  render(<Probe id="standalone" testId="solo" />);
  expect(screen.getByTestId('solo-open')).toHaveTextContent('false');
  await user.click(screen.getByTestId('solo-toggle'));
  expect(screen.getByTestId('solo-open')).toHaveTextContent('true');
  await user.click(screen.getByTestId('solo-toggle'));
  expect(screen.getByTestId('solo-open')).toHaveTextContent('false');
});

it('local-state fallback close button collapses an open popover', async () => {
  render(<Probe id="standalone" testId="solo" />);
  await user.click(screen.getByTestId('solo-toggle'));
  await user.click(screen.getByTestId('solo-close'));
  expect(screen.getByTestId('solo-open')).toHaveTextContent('false');
});

it('two standalone probes (no provider) have independent state', async () => {
  render(
    <div>
      <Probe id="a" testId="a" />
      <Probe id="b" testId="b" />
    </div>
  );
  await user.click(screen.getByTestId('a-toggle'));
  expect(screen.getByTestId('a-open')).toHaveTextContent('true');
  // Without a shared provider each probe owns its own local state — no
  // exclusion, both can be open simultaneously. This is the documented
  // fallback behaviour for standalone use (storybook / unit specs).
  expect(screen.getByTestId('b-open')).toHaveTextContent('false');
  await user.click(screen.getByTestId('b-toggle'));
  expect(screen.getByTestId('a-open')).toHaveTextContent('true');
  expect(screen.getByTestId('b-open')).toHaveTextContent('true');
});

it('provider unmount + remount resets shared state', () => {
  const { unmount } = render(
    <ToolbarPopoverProvider>
      <Probe id="link" testId="link" />
    </ToolbarPopoverProvider>
  );
  act(() => unmount());
  render(
    <ToolbarPopoverProvider>
      <Probe id="link" testId="link" />
    </ToolbarPopoverProvider>
  );
  expect(screen.getByTestId('link-open')).toHaveTextContent('false');
});
