import React from 'react';
import { act, render, cleanup, fireEvent, createEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FocusTrap from '.';

beforeEach(() => {
  jest.useFakeTimers();
});
afterEach(() => {
  jest.useRealTimers();
});
afterEach(cleanup);

describe('<FocusTrap />', () => {
  it('should trap focus and loop', () => {
    const { getAllByRole: getAllByRole1 } = render(
      <div>
        <button>test</button>
      </div>
    );

    // focus on this button before mounting FocusTrap,
    // so we can assert the previously focussed element
    //  gets focus again after unmounting
    getAllByRole1('button').at(0).focus();

    const { getAllByRole, unmount } = render(
      <FocusTrap>
        <button>test 1</button>
        <select>
          <option>test 1</option>
        </select>
        <textarea defaultValue="test 1"></textarea>
      </FocusTrap>
    );

    act(() => {
      userEvent.tab();
    });
    expect(getAllByRole('combobox').at(0)).toHaveFocus();

    act(() => {
      userEvent.tab();
    });
    expect(getAllByRole('textbox').at(0)).toHaveFocus();

    act(() => {
      userEvent.tab();
    });
    expect(getAllByRole('button').at(1)).toHaveFocus();

    act(() => {
      unmount();
      jest.runAllTimers();
    });
    expect(getAllByRole('button').at(0)).toHaveFocus();
  });

  it('should trap focus even with one tabbable element', () => {
    const { getAllByRole } = render(
      <FocusTrap>
        <button>test 1</button>
      </FocusTrap>
    );
    act(() => {
      userEvent.tab();
      userEvent.tab();
      userEvent.tab({ shift: true });
      userEvent.tab({ shift: true });
    });
    expect(getAllByRole('button').at(0)).toHaveFocus();
  });

  it('should trap focus without looping', () => {
    const { getAllByRole } = render(
      <FocusTrap loop={false}>
        <button>test 1</button>
        <button>test 2</button>
      </FocusTrap>
    );
    act(() => {
      userEvent.tab();
      userEvent.tab();
      userEvent.tab();
    });
    expect(getAllByRole('button').at(1)).toHaveFocus();
  });

  it('should not focus on mount when focusOnMount is false', () => {
    const { getAllByRole } = render(
      <FocusTrap focusOnMount={false}>
        <button>test 1</button>
      </FocusTrap>
    );
    expect(getAllByRole('button').at(0)).not.toHaveFocus();

    act(() => {
      userEvent.tab();
    });
    expect(getAllByRole('button').at(0)).toHaveFocus();
  });

  it('should call callback props', () => {
    const onTabExit = jest.fn();
    const onShiftTabExit = jest.fn();
    render(
      <FocusTrap onTabExit={onTabExit} onShiftTabExit={onShiftTabExit}>
        <button>test 1</button>
        <button>test 2</button>
      </FocusTrap>
    );

    act(() => {
      userEvent.tab();
      userEvent.tab();
    });

    expect(onTabExit).toBeCalledTimes(1);

    act(() => {
      userEvent.tab({ shift: true });
      userEvent.tab({ shift: true });
    });

    expect(onShiftTabExit).toBeCalledTimes(1);
  });

  it('should not close on escape if default was prevented', () => {
    const onEscape = jest.fn();
    const { getByTestId } = render(
      <FocusTrap onEscape={onEscape}>
        <button>test 1</button>
        <button>test 2</button>
      </FocusTrap>
    );

    act(() => {
      userEvent.tab();
      userEvent.keyboard('[Escape]');
    });
    expect(onEscape).toBeCalledTimes(1);

    act(() => {
      userEvent.tab();
      const evt = createEvent.keyDown(getByTestId('focus-trap'), { key: 'Escape' });
      evt.preventDefault();
      fireEvent(getByTestId('focus-trap'), evt);
    });
    expect(onEscape).toBeCalledTimes(1);
  });

  it('should work with onClickOutside', () => {
    const onClickOutside = jest.fn();
    const { getAllByRole, getByTestId } = render(
      <div data-testid="outer">
        <FocusTrap onClickOutside={onClickOutside}>
          <button>test 1</button>
          <button>test 2</button>
        </FocusTrap>
      </div>
    );

    act(() => {
      userEvent.tab();
      userEvent.click(getByTestId('outer'));
    });
    expect(onClickOutside).toBeCalledTimes(1);

    act(() => {
      userEvent.tab();
      fireEvent.click(getAllByRole('button').at(0));
    });
    expect(onClickOutside).toBeCalledTimes(1);
  });

  it('should not close onClickOutside if default was prevented or target is inside container', () => {
    const onClickOutside = jest.fn();
    const { getByTestId } = render(
      <div data-testid="outer">
        <FocusTrap onClickOutside={onClickOutside}>
          <div data-testid="inner" />
          <button>test 1</button>
          <button>test 2</button>
        </FocusTrap>
      </div>
    );

    act(() => {
      const evt = createEvent.mouseDown(getByTestId('focus-trap'), { target: getByTestId('inner') });
      fireEvent(getByTestId('inner'), evt);
    });

    expect(onClickOutside).toBeCalledTimes(0);

    act(() => {
      const evt = createEvent.mouseDown(getByTestId('outer'), {});
      evt.preventDefault();
      fireEvent(getByTestId('outer'), evt);
    });

    expect(onClickOutside).toBeCalledTimes(0);
  });

  it('should ignore non-focussable elements', () => {
    render(
      <FocusTrap focusOnMount={false}>
        <div>test 1</div>
      </FocusTrap>
    );

    act(() => {
      userEvent.tab();
      userEvent.tab();
    });
    expect(document.body).toHaveFocus();
  });

  it('should focus previous focussed el when only when unmounting the highest layer', () => {
    const Comp = () => {
      const [modalOpen, setModalOpen] = React.useState(false);
      const [menuOpen, setMenuOpen] = React.useState(false);

      return (
        <div>
          <button onClick={() => setMenuOpen(true)}>Open menu</button>
          {menuOpen && (
            <FocusTrap>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  setModalOpen(true);
                }}
              >
                Open modal
              </button>
            </FocusTrap>
          )}

          {modalOpen && (
            <>
              <FocusTrap
                onEscape={() => {
                  setModalOpen(false);
                }}
              >
                <button>test</button>
              </FocusTrap>
              <FocusTrap
                onEscape={() => {
                  setModalOpen(false);
                }}
              >
                <button>test 2</button>
              </FocusTrap>
            </>
          )}
        </div>
      );
    };

    const { getByText } = render(<Comp />);

    act(() => {
      userEvent.tab();
    });

    expect(getByText('Open menu')).toHaveFocus();

    act(() => {
      userEvent.keyboard('[Enter]');
    });
    act(() => {
      jest.runAllTimers();
    });

    expect(getByText('Open modal')).toHaveFocus();

    act(() => {
      userEvent.keyboard('[Enter]');
    });
    act(() => {
      jest.runAllTimers();
    });
    expect(getByText('Open menu')).toHaveFocus();

    act(() => {
      userEvent.keyboard('[Escape]');
      jest.runAllTimers();
    });
    expect(getByText('Open menu')).toHaveFocus();
  });

  it('should do nothing when disabled', () => {
    const { getAllByRole, getByTestId } = render(
      <div data-testid="outer">
        <FocusTrap disabled>
          <button>test 1</button>
        </FocusTrap>
      </div>
    );
    expect(getAllByRole('button').at(0)).not.toHaveFocus();

    act(() => {
      userEvent.tab();
      userEvent.tab();
      userEvent.keyboard('[Escape]');
      userEvent.click(getByTestId('outer'));
    });
    expect(document.body).toHaveFocus();
  });

  it('should be nestable', () => {
    const Comp = () => {
      const [open1, setOpen1] = React.useState(false);
      const [open2, setOpen2] = React.useState(false);

      return (
        <div>
          <button onClick={() => setOpen1(true)}>test 3</button>

          {open1 && (
            <FocusTrap
              onEscape={() => {
                setOpen1(false);
              }}
            >
              <button onClick={() => setOpen2(true)}>test 1</button>
              {open2 && (
                <FocusTrap
                  onEscape={() => {
                    setOpen2(false);
                  }}
                >
                  <button>test 2</button>
                </FocusTrap>
              )}
            </FocusTrap>
          )}
        </div>
      );
    };

    const { getByText } = render(<Comp />);

    expect(getByText('test 3')).toBeInTheDocument();
    act(() => {
      userEvent.tab();
      userEvent.keyboard('[Enter]');
    });
    expect(getByText('test 1')).toBeInTheDocument();

    act(() => {
      expect(getByText('test 1')).toHaveFocus();
      userEvent.keyboard('[Enter]');
    });

    expect(getByText('test 2')).toBeInTheDocument();
    expect(getByText('test 2')).toHaveFocus();

    act(() => {
      userEvent.keyboard('[Escape]');
    });

    act(() => {
      jest.runAllTimers();
    });

    expect(getByText('test 1')).toHaveFocus();

    act(() => {
      userEvent.keyboard('[Escape]');
    });
  });
});
