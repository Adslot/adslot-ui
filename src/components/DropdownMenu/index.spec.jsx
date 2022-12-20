import React from 'react';
import { render, cleanup, fireEvent, act, queryByAttribute, createEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DropdownMenu from '.';
const getByClass = queryByAttribute.bind(null, 'class');

afterEach(cleanup);

describe('<DropdownMenu />', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  afterEach(cleanup);

  it('should render with props', async () => {
    const itemClickSpy = jest.fn();
    const onOpenSpy = jest.fn();

    const { getAllByRole, getByTestId, getByRole } = render(
      <DropdownMenu contentId="menu" triggerId="trigger" onOpen={onOpenSpy}>
        <DropdownMenu.Trigger>Menu</DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Group title="Group" collapsible>
            <DropdownMenu.Item disabled>Item 1</DropdownMenu.Item>
            <DropdownMenu.Item>Item 2</DropdownMenu.Item>
            <DropdownMenu.Item onClick={itemClickSpy}>Item 3</DropdownMenu.Item>
          </DropdownMenu.Group>
          <DropdownMenu.Label>Label</DropdownMenu.Label>
          <DropdownMenu.Divider />
          some content
          <DropdownMenu.ItemContainer>some content</DropdownMenu.ItemContainer>
        </DropdownMenu.Content>
      </DropdownMenu>
    );

    const trigger = getAllByRole('button')[0];
    expect(trigger).toBeInTheDocument();
    expect(trigger).toHaveAccessibleName('Menu');

    const ev = createEvent.click(trigger);

    await act(async () => {
      fireEvent(trigger, ev);
    });

    await act(async () => {
      jest.runAllTimers();
    });

    expect(onOpenSpy).toBeCalledTimes(1);

    expect(getAllByRole('button')[0]).toHaveAttribute('aria-expanded', 'true');

    expect(getByTestId('panel-wrapper')).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(getByTestId('panel-header'));
    });

    expect(getByTestId('panel-wrapper')).toHaveClass('collapsed');
    expect(getByTestId('panel-content')).toBeInTheDocument();

    expect(getByRole('menu')).toBeInTheDocument();
    expect(getByRole('menu')).toHaveAccessibleName('Menu');
    expect(getByRole('menu')).toHaveClass('aui--dropdown-content');

    expect(getAllByRole('menuitem')).toHaveLength(3);
    expect(getAllByRole('menuitem')[0]).toBeDisabled();
    expect(getAllByRole('menuitem')[0]).toHaveClass('aui--dropdown-item');

    await act(async () => {
      fireEvent.click(getAllByRole('menuitem')[2]);
    });
    expect(trigger).not.toHaveAttribute('aria-expanded');
    expect(itemClickSpy).toHaveBeenCalledTimes(1);
  });

  it('should close menu on item click', () => {
    const itemClickSpy = jest.fn();

    const { getAllByRole } = render(
      <DropdownMenu contentId="menu" triggerId="trigger">
        <DropdownMenu.Trigger>Menu</DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Group title="Group">
            <DropdownMenu.Item>Item 1</DropdownMenu.Item>
            <DropdownMenu.Item>Item 2</DropdownMenu.Item>
            <DropdownMenu.Item onClick={itemClickSpy}>Item 3</DropdownMenu.Item>
          </DropdownMenu.Group>
        </DropdownMenu.Content>
      </DropdownMenu>
    );

    const trigger = getAllByRole('button')[0];
    expect(trigger).toBeInTheDocument();
    expect(trigger).toHaveAccessibleName('Menu');

    act(() => {
      fireEvent.click(trigger);
      jest.runAllTimers();
    });

    act(() => {
      fireEvent.click(getAllByRole('menuitem')[1]);
    });
    expect(itemClickSpy).toHaveBeenCalledTimes(0);

    act(() => {
      fireEvent.click(getAllByRole('menuitem')[2]);
    });

    expect(itemClickSpy).toHaveBeenCalledTimes(1);

    expect(trigger).not.toHaveAttribute('aria-expanded');
  });

  it('should work with render function content', () => {
    const itemClickSpy = jest.fn();

    const { getAllByRole } = render(
      <DropdownMenu onOpen={(e) => e.preventDefault()} contentId="menu" triggerId="trigger">
        <DropdownMenu.Trigger>Menu</DropdownMenu.Trigger>
        <DropdownMenu.Content>
          {() => (
            <DropdownMenu.Group title="Group">
              <DropdownMenu.Item>Item 1</DropdownMenu.Item>
              <DropdownMenu.Item>Item 2</DropdownMenu.Item>
              <DropdownMenu.Item onClick={itemClickSpy}>Item 3</DropdownMenu.Item>
            </DropdownMenu.Group>
          )}
        </DropdownMenu.Content>
      </DropdownMenu>
    );

    const trigger = getAllByRole('button')[0];

    act(() => {
      fireEvent.click(trigger);
    });

    expect(getAllByRole('menuitem')).toHaveLength(3);
  });

  it('should close on click outside', () => {
    const { getAllByRole } = render(
      <DropdownMenu contentId="menu" triggerId="trigger" defaultOpen>
        <DropdownMenu.Trigger>Menu</DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Group>
            <DropdownMenu.Item>Item 1</DropdownMenu.Item>
            <DropdownMenu.Item>Item 2</DropdownMenu.Item>
            <DropdownMenu.Item>Item 3</DropdownMenu.Item>
          </DropdownMenu.Group>
        </DropdownMenu.Content>
      </DropdownMenu>
    );

    const trigger = getAllByRole('button')[0];
    expect(trigger).toBeInTheDocument();
    expect(trigger).toHaveAccessibleName('Menu');

    expect(trigger).toHaveAttribute('aria-expanded', 'true');

    // click within menu should not close menu
    act(() => {
      fireEvent.click(getAllByRole('menuitem')[0]);
    });

    expect(trigger).toHaveAttribute('aria-expanded', 'true');

    act(() => {
      fireEvent.mouseDown(document.body);
    });

    expect(trigger).not.toHaveAttribute('aria-expanded');
  });

  it('should render function the context', () => {
    const { getAllByRole, getByText } = render(
      <DropdownMenu contentId="menu" triggerId="trigger">
        {({ closeMenu }) => (
          <>
            <DropdownMenu.Trigger>Menu</DropdownMenu.Trigger>
            <DropdownMenu.Content>
              <DropdownMenu.Group>
                <DropdownMenu.Item>Item 1</DropdownMenu.Item>
                <DropdownMenu.Item>Item 2</DropdownMenu.Item>
                <DropdownMenu.Item>Item 3</DropdownMenu.Item>
                <button onClick={closeMenu}>Close</button>
              </DropdownMenu.Group>
            </DropdownMenu.Content>
          </>
        )}
      </DropdownMenu>
    );

    const trigger = getAllByRole('button')[0];

    act(() => {
      fireEvent.click(trigger);
    });
    expect(getAllByRole('button')[0]).toHaveAttribute('aria-expanded', 'true');

    act(() => {
      fireEvent.click(getByText('Close'));
    });
    expect(getAllByRole('button')[0]).not.toHaveAttribute('aria-expanded');
  });

  it('should not trigger menu when trigger is disabled', () => {
    const { getAllByRole } = render(
      <DropdownMenu contentId="menu" triggerId="trigger">
        <DropdownMenu.Trigger disabled>Menu</DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Group>
            <DropdownMenu.Item>Item 1</DropdownMenu.Item>
            <DropdownMenu.Item>Item 2</DropdownMenu.Item>
            <DropdownMenu.Item>Item 3</DropdownMenu.Item>
          </DropdownMenu.Group>
        </DropdownMenu.Content>
      </DropdownMenu>
    );

    const trigger = getAllByRole('button')[0];
    expect(trigger).toBeDisabled();

    act(() => {
      fireEvent.keyDown(trigger, { key: 'Enter' });
    });

    act(() => {
      jest.runAllTimers();
    });

    expect(trigger).not.toHaveAttribute('aria-expanded');
  });

  it('should not close on item click if closeOnItemClick is false', () => {
    const { getAllByRole, getAllByLabelText } = render(
      <DropdownMenu contentId="menu" triggerId="trigger" closeOnItemClick={false}>
        <DropdownMenu.Trigger>Menu</DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Group>
            <DropdownMenu.Item onClick={() => {}}>Item 1</DropdownMenu.Item>
          </DropdownMenu.Group>
          <DropdownMenu.RadioGroup name="test-group" value="" onChange={() => {}}>
            <DropdownMenu.Radio value="item-3" label="radio" />
          </DropdownMenu.RadioGroup>
          <DropdownMenu.CheckboxGroup name="test-group-2" value={[]} onChange={() => {}}>
            <DropdownMenu.Checkbox value="item-2" label="checkbox" />
          </DropdownMenu.CheckboxGroup>
        </DropdownMenu.Content>
      </DropdownMenu>
    );

    const trigger = getAllByRole('button')[0];

    act(() => {
      fireEvent.click(trigger);
    });
    act(() => {
      fireEvent.click(getAllByRole('menuitem')[0]);
    });
    expect(getAllByRole('menuitem')[0]).toBeInTheDocument();
    expect(trigger).toHaveAttribute('aria-expanded');

    act(() => {
      fireEvent.click(getAllByLabelText('checkbox')[0]);
    });
    expect(getAllByRole('menuitemcheckbox')[0]).toBeInTheDocument();
    expect(trigger).toHaveAttribute('aria-expanded');

    act(() => {
      fireEvent.click(getAllByLabelText('radio')[0]);
    });
    expect(getAllByRole('menuitemradio')[0]).toBeInTheDocument();
    expect(trigger).toHaveAttribute('aria-expanded');
  });

  it('should open and close with keyboard', () => {
    const { getAllByRole } = render(
      <DropdownMenu contentId="menu" triggerId="trigger">
        <DropdownMenu.Trigger>Menu</DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Group>
            <DropdownMenu.Item>Item 1</DropdownMenu.Item>
            <DropdownMenu.Item>Item 2</DropdownMenu.Item>
            <DropdownMenu.Item>Item 3</DropdownMenu.Item>
          </DropdownMenu.Group>
        </DropdownMenu.Content>
      </DropdownMenu>
    );

    const trigger = getAllByRole('button')[0];
    expect(trigger).toBeInTheDocument();
    expect(trigger).toHaveAccessibleName('Menu');

    act(() => {
      userEvent.tab();
    });
    expect(trigger).toHaveFocus();

    act(() => {
      userEvent.keyboard('[Enter]');
    });

    act(() => {
      jest.runAllTimers();
    });

    act(() => {
      userEvent.keyboard('[ArrowDown]');
    });

    expect(getAllByRole('button')[0]).toHaveAttribute('aria-expanded', 'true');
    expect(getAllByRole('menuitem')[0]).toHaveFocus();

    act(() => {
      userEvent.keyboard('[Escape]');
    });
    act(() => {
      jest.runAllTimers();
    });
    expect(trigger).not.toHaveAttribute('aria-expanded');
  });

  it('should prevent default when activating the trigger with keyboard', () => {
    const { getAllByRole } = render(
      <DropdownMenu contentId="menu" triggerId="trigger">
        <DropdownMenu.Trigger>Menu</DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Group>
            <DropdownMenu.Item>Item 1</DropdownMenu.Item>
            <DropdownMenu.Item>Item 2</DropdownMenu.Item>
            <DropdownMenu.Item>Item 3</DropdownMenu.Item>
          </DropdownMenu.Group>
        </DropdownMenu.Content>
        <div>
          <button>Outside</button>
        </div>
      </DropdownMenu>
    );

    const trigger = getAllByRole('button')[0];

    act(() => {
      userEvent.tab();
    });

    expect(trigger).toHaveFocus();

    const ev = createEvent.keyDown(trigger, { key: 'ArrowUp' });

    act(() => {
      fireEvent(trigger, ev);
      jest.runAllTimers();
    });
    expect(ev.defaultPrevented).toBeFalsy();
    expect(trigger).toHaveFocus();

    const ev2 = createEvent.click(trigger, { key: ' ' });
    act(() => {
      fireEvent(trigger, ev2);
      jest.runAllTimers();
    });

    expect(trigger).toHaveAttribute('aria-expanded');
  });

  it('should handle nested submenus', async () => {
    const { getAllByRole, getByText } = render(
      <DropdownMenu closeOnItemClick={false} contentId="menu" triggerId="trigger">
        <DropdownMenu.Trigger>Menu</DropdownMenu.Trigger>
        <DropdownMenu.Content placement="bottom-end">
          <DropdownMenu.Group>
            <DropdownMenu.Item>Item 1</DropdownMenu.Item>
            <DropdownMenu.Item>Item 2</DropdownMenu.Item>
            <DropdownMenu.Item>Item 3</DropdownMenu.Item>
          </DropdownMenu.Group>
          <DropdownMenu submenu contentId="submenu" triggerId="submenu-trigger">
            <DropdownMenu.Trigger>Sub Menu</DropdownMenu.Trigger>
            <DropdownMenu.Content>
              <DropdownMenu.Group>
                <DropdownMenu.Item>Sub Item 1</DropdownMenu.Item>
                <DropdownMenu.Item>Sub Item 2</DropdownMenu.Item>
                <DropdownMenu.Item>Sub Item 3</DropdownMenu.Item>
              </DropdownMenu.Group>
            </DropdownMenu.Content>
          </DropdownMenu>
        </DropdownMenu.Content>
      </DropdownMenu>
    );
    const trigger = getAllByRole('button')[0];

    await act(async () => {
      userEvent.tab();
    });

    expect(trigger).toHaveFocus();

    await act(async () => {
      userEvent.keyboard('[Enter]');
    });

    await act(async () => {
      jest.runAllTimers();
    });

    expect(getByClass(document, 'aui--popover-wrapper popover-light aui--dropdown-popover open')).toHaveAttribute(
      'placement',
      'bottom-end'
    );

    await act(async () => {
      userEvent.keyboard('[ArrowUp]');
    });

    const subMenuTrigger = getByText('Sub Menu').parentElement;

    expect(subMenuTrigger).toHaveFocus();

    // sub menu shouldn't trigger with arrow down, it should loop to the first item
    await act(async () => {
      userEvent.keyboard('[ArrowDown]');
    });

    expect(getAllByRole('menuitem')[0]).toHaveFocus();

    // go back to the submenu trigger
    await act(async () => {
      userEvent.keyboard('[ArrowUp]');
    });

    await act(async () => {
      userEvent.keyboard('[ArrowRight]');
    });

    await act(async () => {
      jest.runAllTimers();
    });
    expect(subMenuTrigger).toHaveAttribute('aria-expanded');

    expect(getAllByRole('menu')).toHaveLength(2);

    // exit submenu with left arrow
    await act(async () => {
      userEvent.keyboard('[ArrowLeft]');
    });

    await act(async () => {
      jest.runAllTimers();
    });

    expect(getAllByRole('menu')[1]).toBeUndefined();

    await act(async () => {
      userEvent.keyboard('[ArrowRight]');
    });

    await act(async () => {
      jest.runAllTimers();
    });

    await act(async () => {
      userEvent.tab();
      userEvent.tab();
      userEvent.keyboard('[ArrowLeft]');
    });

    await act(async () => {
      await jest.runAllTimers();
    });

    // closing submenu focuses its trigger
    expect(subMenuTrigger).not.toHaveAttribute('aria-expanded');
    expect(subMenuTrigger).toHaveFocus();

    // clicking on parent menu triggers clickOutside for submenu only
    await act(async () => {
      userEvent.keyboard('[ArrowRight]');
    });

    await act(async () => {
      jest.runAllTimers();
    });

    expect(subMenuTrigger).toHaveAttribute('aria-expanded', 'true');

    // asserts clicking on submenu item inherited `closeOnItemClick={false}` from parent
    await act(async () => {
      userEvent.keyboard('[Tab][Enter][ArrowDown][ArrowDown][ArrowDown][Enter][Enter]');
    });

    expect(trigger).toHaveAttribute('aria-expanded');

    // trigger click outside for submenu by clicking on parent menu, should close sub menu only
    act(() => {
      fireEvent.mouseDown(getAllByRole('menu')[0]);
    });

    expect(getAllByRole('menu')[1]).toBeUndefined();
  });

  it('should render menu specific radio and checkbox components', () => {
    const onChangeSpy = jest.fn();

    const { getAllByRole } = render(
      <DropdownMenu contentId="menu" triggerId="trigger">
        <DropdownMenu.Trigger>Menu</DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.CheckboxGroup name="test-1" value={[]} onChange={onChangeSpy}>
            <DropdownMenu.CheckboxAll values={['check', 'check-2']} label="All" />
            <DropdownMenu.Checkbox value="check" label="check" />
            <DropdownMenu.Checkbox value="check-2" label="check-2" />
          </DropdownMenu.CheckboxGroup>
          <DropdownMenu.RadioGroup name="test-2" value={''} onChange={onChangeSpy}>
            <DropdownMenu.Radio value="radio" label="radio" />
            <DropdownMenu.Radio value="radio-2" label="radio-2" />
          </DropdownMenu.RadioGroup>
          <DropdownMenu.Checkbox onChange={() => {}} value="test" />
        </DropdownMenu.Content>
        <div>
          <button>Outside</button>
        </div>
      </DropdownMenu>
    );

    act(() => {
      userEvent.tab();
    });

    act(() => {
      userEvent.keyboard('[Enter]');
    });

    act(() => {
      jest.runAllTimers();
    });
    act(() => {
      userEvent.keyboard('[ArrowDown]');
    });
    expect(getAllByRole('menuitemcheckbox')).toHaveLength(4);
    expect(getAllByRole('menuitemradio')).toHaveLength(2);
    expect(getAllByRole('menuitemcheckbox').at(0)).toHaveFocus();

    // check 2nd checkbox
    act(() => {
      userEvent.keyboard('[ArrowDown][Space]');
    });
    act(() => {
      jest.runAllTimers();
    });

    expect(onChangeSpy).nthCalledWith(1, ['check'], 'test-1', 'check');

    act(() => {
      jest.runAllTimers();
    });

    // re-open
    act(() => {
      userEvent.keyboard('[Enter]');
    });
    act(() => {
      jest.runAllTimers();
    });
    act(() => {
      userEvent.keyboard('[ArrowDown]');
    });

    // check first radio
    act(() => {
      userEvent.keyboard('[ArrowDown][ArrowDown][ArrowDown]');
      expect(getAllByRole('menuitemradio').at(0)).toHaveFocus();
      userEvent.keyboard('[Space]');
    });
    expect(onChangeSpy).nthCalledWith(2, 'radio');
  });
});
