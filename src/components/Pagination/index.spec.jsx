import _ from 'lodash';
import React from 'react';
import { render, screen, user } from 'testing';
import Pagination from '.';

describe('<PagedGrid />', () => {
  it('should render with default props', () => {
    const props = {
      pageCount: 10,
      onSelect: jest.fn(),
    };
    render(<Pagination {...props} />);

    expect(screen.getByTestId('pagination-wrapper')).toHaveClass('aui--pagination');

    expect(screen.getAllByTestId('button-wrapper')).toHaveLength(5);
    expect(screen.getAllByTestId('button-wrapper')[0]).toHaveClass('active');
    expect(screen.getAllByTestId('button-wrapper')[0]).toHaveTextContent('1');

    expect(screen.getAllByTestId('button-wrapper')[1]).toHaveTextContent('2');
    expect(screen.getAllByTestId('button-wrapper')[2]).toHaveTextContent('3');
    expect(screen.getAllByTestId('button-wrapper')[3]).toHaveTextContent('10');
    expect(screen.getAllByTestId('button-wrapper')[4]).toHaveClass('aui--pagination-sides');

    expect(screen.getByTestId('pagination-right-ellipsis')).toBeInTheDocument();
  });

  it('should show active pagination button as specified', () => {
    const props = {
      activePage: 2,
      pageCount: 10,
      onSelect: jest.fn(),
    };
    render(<Pagination {...props} />);

    expect(screen.getByTestId('pagination-wrapper')).toHaveClass('aui--pagination');

    expect(screen.getAllByTestId('button-wrapper')).toHaveLength(6);
    expect(screen.getAllByTestId('button-wrapper')[0]).toHaveClass('aui--pagination-sides');
    expect(screen.getAllByTestId('button-wrapper')[1]).toHaveTextContent('1');
    expect(screen.getAllByTestId('button-wrapper')[1]).not.toHaveClass('active');

    expect(screen.getAllByTestId('button-wrapper')[2]).toHaveTextContent('2');
    expect(screen.getAllByTestId('button-wrapper')[2]).toHaveClass('active');

    expect(screen.getAllByTestId('button-wrapper')[5]).toHaveClass('aui--pagination-sides');
  });

  it('should not show prev/next button as specified', () => {
    const props = {
      prev: false,
      next: false,
      activePage: 2,
      pageCount: 10,
      onSelect: jest.fn(),
    };
    render(<Pagination {...props} />);

    expect(screen.getByTestId('pagination-wrapper')).toHaveClass('aui--pagination');

    expect(screen.getAllByTestId('button-wrapper')).toHaveLength(4);
    const buttons = screen.getAllByTestId('button-wrapper');

    _.forEach(buttons, (button) => expect(button).not.toHaveClass('aui--pagination-sides'));
  });

  it('should trigger selecting events of buttons when active page is 1', async () => {
    const props = {
      activePage: 1,
      pageCount: 10,
      onSelect: jest.fn(),
    };
    render(<Pagination {...props} />);

    expect(screen.getByTestId('pagination-wrapper')).toHaveClass('aui--pagination');
    expect(screen.getAllByTestId('button-wrapper')).toHaveLength(5);

    await user.click(screen.getAllByTestId('button-wrapper')[0]);
    expect(props.onSelect).toHaveBeenCalledTimes(1);
    expect(props.onSelect).toHaveBeenCalledWith(1);

    await user.click(screen.getAllByTestId('button-wrapper')[1]);
    expect(props.onSelect).toHaveBeenCalledTimes(2);
    expect(props.onSelect).toHaveBeenLastCalledWith(2);

    await user.click(screen.getAllByTestId('button-wrapper')[2]);
    expect(props.onSelect).toHaveBeenCalledTimes(3);
    expect(props.onSelect).toHaveBeenLastCalledWith(3);

    await user.click(screen.getAllByTestId('button-wrapper')[3]);
    expect(props.onSelect).toHaveBeenCalledTimes(4);
    expect(props.onSelect).toHaveBeenLastCalledWith(10);

    await user.click(screen.getAllByTestId('button-wrapper')[4]);
    expect(props.onSelect).toHaveBeenCalledTimes(5);
    expect(props.onSelect).toHaveBeenLastCalledWith(2);
  });

  it('should trigger selecting events of buttons when active page is 4', async () => {
    const props = {
      activePage: 4,
      pageCount: 10,
      onSelect: jest.fn(),
    };
    render(<Pagination {...props} />);

    expect(screen.getAllByTestId('button-wrapper')).toHaveLength(7);
    expect(screen.getAllByTestId('button-wrapper')[0]).toHaveClass('aui--pagination-sides');
    expect(screen.getAllByTestId('button-wrapper')[6]).toHaveClass('aui--pagination-sides');

    expect(screen.getByTestId('pagination-left-ellipsis')).toBeInTheDocument();
    expect(screen.getByTestId('pagination-right-ellipsis')).toBeInTheDocument();

    await user.click(screen.getAllByTestId('button-wrapper')[0]);
    expect(props.onSelect).toHaveBeenCalledTimes(1);
    expect(props.onSelect).toHaveBeenCalledWith(3);

    await user.click(screen.getAllByTestId('button-wrapper')[1]);
    expect(props.onSelect).toHaveBeenCalledTimes(2);
    expect(props.onSelect).toHaveBeenLastCalledWith(1);

    await user.click(screen.getAllByTestId('button-wrapper')[2]);
    expect(props.onSelect).toHaveBeenCalledTimes(3);
    expect(props.onSelect).toHaveBeenLastCalledWith(3);

    await user.click(screen.getAllByTestId('button-wrapper')[3]);
    expect(props.onSelect).toHaveBeenCalledTimes(4);
    expect(props.onSelect).toHaveBeenLastCalledWith(4);

    await user.click(screen.getAllByTestId('button-wrapper')[4]);
    expect(props.onSelect).toHaveBeenCalledTimes(5);
    expect(props.onSelect).toHaveBeenLastCalledWith(5);

    await user.click(screen.getAllByTestId('button-wrapper')[5]);
    expect(props.onSelect).toHaveBeenCalledTimes(6);
    expect(props.onSelect).toHaveBeenLastCalledWith(10);

    await user.click(screen.getAllByTestId('button-wrapper')[6]);
    expect(props.onSelect).toHaveBeenCalledTimes(7);
    expect(props.onSelect).toHaveBeenLastCalledWith(5);
  });

  it('should trigger selecting events of buttons when active page is 4 and pageCount is 4', async () => {
    const props = {
      activePage: 4,
      pageCount: 4,
      onSelect: jest.fn(),
    };
    render(<Pagination {...props} />);

    expect(screen.getAllByTestId('button-wrapper')).toHaveLength(5);
    expect(screen.getAllByTestId('button-wrapper')[0]).toHaveClass('aui--pagination-sides');

    await user.click(screen.getAllByTestId('button-wrapper')[0]);
    expect(props.onSelect).toHaveBeenCalledTimes(1);
    expect(props.onSelect).toHaveBeenCalledWith(3);

    await user.click(screen.getAllByTestId('button-wrapper')[1]);
    expect(props.onSelect).toHaveBeenCalledTimes(2);
    expect(props.onSelect).toHaveBeenLastCalledWith(1);

    await user.click(screen.getAllByTestId('button-wrapper')[2]);
    expect(props.onSelect).toHaveBeenCalledTimes(3);
    expect(props.onSelect).toHaveBeenLastCalledWith(2);

    await user.click(screen.getAllByTestId('button-wrapper')[3]);
    expect(props.onSelect).toHaveBeenCalledTimes(4);
    expect(props.onSelect).toHaveBeenLastCalledWith(3);

    await user.click(screen.getAllByTestId('button-wrapper')[4]);
    expect(props.onSelect).toHaveBeenCalledTimes(5);
    expect(props.onSelect).toHaveBeenLastCalledWith(4);
  });

  it('should show all item buttons and trigger selecting events of buttons when pageCount is 5', async () => {
    const props = {
      pageCount: 5,
      onSelect: jest.fn(),
    };
    const view = render(<Pagination {...props} activePage={1} />);

    expect(screen.getAllByTestId('button-wrapper')).toHaveLength(6);
    expect(screen.getAllByTestId('button-wrapper')[5]).toHaveClass('aui--pagination-sides');

    await user.click(screen.getAllByTestId('button-wrapper')[0]);
    expect(props.onSelect).toHaveBeenCalledTimes(1);
    expect(props.onSelect).toHaveBeenCalledWith(1);

    await user.click(screen.getAllByTestId('button-wrapper')[1]);
    expect(props.onSelect).toHaveBeenCalledTimes(2);
    expect(props.onSelect).toHaveBeenLastCalledWith(2);

    await user.click(screen.getAllByTestId('button-wrapper')[2]);
    expect(props.onSelect).toHaveBeenCalledTimes(3);
    expect(props.onSelect).toHaveBeenLastCalledWith(3);

    await user.click(screen.getAllByTestId('button-wrapper')[3]);
    expect(props.onSelect).toHaveBeenCalledTimes(4);
    expect(props.onSelect).toHaveBeenLastCalledWith(4);

    await user.click(screen.getAllByTestId('button-wrapper')[4]);
    expect(props.onSelect).toHaveBeenCalledTimes(5);
    expect(props.onSelect).toHaveBeenLastCalledWith(5);

    await user.click(screen.getAllByTestId('button-wrapper')[5]);
    expect(props.onSelect).toHaveBeenCalledTimes(6);
    expect(props.onSelect).toHaveBeenLastCalledWith(2);

    view.rerender(<Pagination {...props} activePage={5} />);
    expect(screen.getAllByTestId('button-wrapper')).toHaveLength(6);
    expect(screen.getAllByTestId('button-wrapper')[0]).toHaveClass('aui--pagination-sides');

    await user.click(screen.getAllByTestId('button-wrapper')[0]);
    expect(props.onSelect).toHaveBeenCalledTimes(7);
    expect(props.onSelect).toHaveBeenCalledWith(4);

    await user.click(screen.getAllByTestId('button-wrapper')[1]);
    expect(props.onSelect).toHaveBeenCalledTimes(8);
    expect(props.onSelect).toHaveBeenLastCalledWith(1);

    await user.click(screen.getAllByTestId('button-wrapper')[2]);
    expect(props.onSelect).toHaveBeenCalledTimes(9);
    expect(props.onSelect).toHaveBeenLastCalledWith(2);

    await user.click(screen.getAllByTestId('button-wrapper')[3]);
    expect(props.onSelect).toHaveBeenCalledTimes(10);
    expect(props.onSelect).toHaveBeenLastCalledWith(3);

    await user.click(screen.getAllByTestId('button-wrapper')[4]);
    expect(props.onSelect).toHaveBeenCalledTimes(11);
    expect(props.onSelect).toHaveBeenLastCalledWith(4);

    await user.click(screen.getAllByTestId('button-wrapper')[5]);
    expect(props.onSelect).toHaveBeenCalledTimes(12);
    expect(props.onSelect).toHaveBeenLastCalledWith(5);
  });
});
