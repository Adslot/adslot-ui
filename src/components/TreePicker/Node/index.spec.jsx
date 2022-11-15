import _ from 'lodash';
import React from 'react';
import { render, cleanup, fireEvent, queryByAttribute, queryAllByAttribute } from '@testing-library/react';
import TreePickerNode from '.';
import TreePickerMocks from '../mocks';

afterEach(cleanup);

const getByClass = queryByAttribute.bind(null, 'class');
const queryAllByClass = queryAllByAttribute.bind(null, 'class');
const queryAllByDts = queryAllByAttribute.bind(null, 'data-test-selector');

describe('<TreePickerNode />', () => {
  const { cbrNode, cbrNodeAlreadySelected, actNode, maleNode, itemType, nodeRenderer } = TreePickerMocks;

  it('should render a node with defaults', () => {
    const { container, getByTestId, queryByTestId, queryAllByTestId, getByText, queryByText } = render(
      <TreePickerNode itemType={itemType} node={cbrNode} />
    );

    expect(getByTestId('treepicker-node-wrapper')).toHaveClass('treepickernode-component child-node');

    expect(getByTestId('grid-row-wrapper')).toHaveAttribute(
      'data-test-selector',
      `${_.kebabCase(itemType)}-${cbrNode.id}`
    );

    expect(queryAllByTestId('grid-cell-wrapper')).toHaveLength(3);
    expect(queryAllByTestId('grid-cell-wrapper')[2]).toContainElement(getByText('+'));
    expect(getByText('+').parentElement.tagName).toBe('BUTTON');
    expect(queryByText('+')).toBeInTheDocument();

    expect(queryAllByTestId('grid-cell-wrapper')[0]).toContainElement(getByTestId('text-ellipsis'));
    expect(queryByTestId('text-ellipsis')).toBeInTheDocument();
    expect(getByTestId('text-ellipsis')).toHaveTextContent('Canberra');

    expect(getByClass(container, 'treepickernode-component-metadata')).toBeTruthy();
    expect(getByClass(container, 'treepickernode-component-metadata')).toHaveTextContent('(City in ACT, AU)');
    expect(getByText('ACT, AU')).toHaveClass('treepickernode-component-path');

    expect(getByText('2000')).toHaveClass('grid-component-cell');
    expect(queryAllByTestId('grid-cell-wrapper')[2]).toHaveClass('grid-component-cell-button');
  });

  it('should render metadata of nodes already selected containing ancestory data', () => {
    const { container, getByText } = render(<TreePickerNode itemType={itemType} node={cbrNodeAlreadySelected} />);

    expect(queryAllByClass(container, 'treepickernode-component-metadata')).toHaveLength(1);
    expect(getByClass(container, 'treepickernode-component-metadata')).toHaveTextContent('(City in ACT, AU)');
    expect(getByText('ACT, AU')).toHaveClass('treepickernode-component-path');
  });

  it('should render node via nodeRenderer', () => {
    const { getByTestId, getByText } = render(
      <TreePickerNode itemType={itemType} node={actNode} nodeRenderer={nodeRenderer} />
    );

    expect(getByTestId('text-ellipsis')).toContainElement(getByText('Test value: Australian Capital Territory'));
  });

  it('should have correct accent color', () => {
    const { getByTestId, rerender } = render(
      <TreePickerNode itemType={itemType} node={{ ...actNode, accent: 'error' }} nodeRenderer={nodeRenderer} />
    );

    expect(getByTestId('treepicker-node-wrapper')).toHaveClass('is-error');
    rerender(
      <TreePickerNode itemType={itemType} node={{ ...actNode, accent: 'warning' }} nodeRenderer={nodeRenderer} />
    );
    expect(getByTestId('treepicker-node-wrapper')).toHaveClass('is-warning');
  });

  it('should render unselectable nodes with an include button', () => {
    const { queryAllByTestId, getByText, queryByText } = render(<TreePickerNode itemType={itemType} node={actNode} />);

    expect(queryAllByTestId('grid-cell-wrapper')).toHaveLength(3); // meta data cell and value cell
    expect(getByText('+').parentElement.tagName).toBe('BUTTON');
    expect(queryByText('+')).toBeInTheDocument();
  });

  it('should render the button first when selected is true', () => {
    const { queryAllByTestId, getByText, queryByText } = render(
      <TreePickerNode itemType={itemType} node={cbrNode} selected />
    );

    expect(queryAllByTestId('grid-cell-wrapper')).toHaveLength(3); // remove button cell, meta data cell and value cell
    expect(queryAllByTestId('grid-cell-wrapper')[0]).toHaveAttribute('data-test-selector', 'button-remove');
    expect(getByText('−').parentElement.tagName).toBe('BUTTON');
    expect(queryByText('−')).toBeInTheDocument();
  });

  it('should render button as disabled when disabled is true', () => {
    const testFunction = jest.fn();
    const { getByText } = render(
      <TreePickerNode itemType={itemType} node={cbrNode} removeNode={testFunction} selected disabled />
    );
    expect(getByText('−').closest('button')).toBeDisabled();

    fireEvent.click(getByText('−'));
    expect(testFunction).toHaveBeenCalledTimes(0);
  });

  it('should filter value when provided', () => {
    const valueFormatter = (value) => `€${value / 100}`;
    const { queryAllByTestId } = render(
      <TreePickerNode itemType={itemType} node={cbrNode} valueFormatter={valueFormatter} />
    );

    expect(queryAllByTestId('grid-cell-wrapper')[1]).toHaveTextContent('€20');
  });

  it('should hide value when no value Number', () => {
    const node = _.clone(cbrNode);
    delete node.value;
    const props = { itemType, node };
    const { queryAllByTestId } = render(<TreePickerNode {...props} />);

    expect(queryAllByTestId('grid-cell-wrapper')).toHaveLength(2);
    expect(queryAllByTestId('grid-cell-wrapper')[0]).toHaveTextContent('Canberra(City in ACT, AU)');
    expect(queryAllByTestId('grid-cell-wrapper')[1]).toHaveTextContent('+');
  });

  it('should not have the child node class for root nodes', () => {
    const { getByTestId } = render(<TreePickerNode itemType={itemType} node={maleNode} />);
    expect(getByTestId('treepicker-node-wrapper')).toHaveClass('treepickernode-component');
  });

  it('should have the child node class for child nodes', () => {
    const { getByTestId } = render(<TreePickerNode itemType={itemType} node={cbrNode} />);
    expect(getByTestId('treepicker-node-wrapper')).toHaveClass('treepickernode-component child-node');
  });

  it('should fire expandNode when clicking on the label cell', () => {
    const mockExpand = jest.fn();
    const { queryAllByTestId } = render(<TreePickerNode itemType={itemType} node={cbrNode} expandNode={mockExpand} />);

    expect(queryAllByTestId('grid-cell-wrapper')[0]).toHaveAttribute('data-test-selector', 'label');

    fireEvent.click(queryAllByTestId('grid-cell-wrapper')[0]);
    expect(mockExpand).toHaveBeenCalledTimes(1);
  });

  it('should not show the expander element when the node is not expandable', () => {
    const props = {
      mockExpand: jest.fn(),
      node: _.defaults({ isExpandable: false }, cbrNode),
      itemType,
    };

    const { queryAllByTestId } = render(<TreePickerNode {...props} />);

    expect(queryAllByTestId('grid-cell-wrapper')).toHaveLength(3); // meta data cell, value cell and include button cell

    fireEvent.click(queryAllByTestId('grid-cell-wrapper')[0]);
    expect(props.mockExpand).toHaveBeenCalledTimes(0);
  });

  it('should not show the expander element when the node is expandable and no expandNode is given', () => {
    const props = {
      node: _.defaults({ isExpandable: true }, cbrNode),
      itemType,
    };

    const { container } = render(<TreePickerNode {...props} />);
    expect(queryAllByDts(container, 'expander')).toHaveLength(0);
  });

  it('should fire includeNode when clicking on the `include` button', () => {
    const nodes = [];
    const includeNode = (node) => nodes.push(node);
    const { queryAllByTestId, getByText } = render(
      <TreePickerNode itemType={itemType} node={cbrNode} includeNode={includeNode} />
    );

    expect(queryAllByTestId('grid-cell-wrapper')).toHaveLength(3); // meta data cell, value cell and include button cell
    fireEvent.click(getByText('+'));
    expect(nodes).toEqual([cbrNode]);
  });

  it('should error on click of `include` button without includeNode handler', () => {
    console.error = (err) => {
      throw new Error(err);
    };

    const { queryAllByTestId, getByText } = render(<TreePickerNode itemType={itemType} node={cbrNode} />);
    expect(queryAllByTestId('grid-cell-wrapper')).toHaveLength(3); // meta data cell, value cell and include button cell

    expect(() => {
      fireEvent.click(getByText('+'));
    }).toThrow('AdslotUi TreePickerNode needs an includeNode handler');
  });

  it('should render a provided node with an empty breadcrumb array', () => {
    const node = {
      id: '3',
      label: 'Cameroon',
      type: 'Country',
      value: 400,
      path: [],
    };
    const { queryAllByTestId, getByTestId, container } = render(<TreePickerNode itemType={itemType} node={node} />);

    expect(queryAllByTestId('grid-cell-wrapper')).toHaveLength(3); // meta data cell, value cell and include button cell

    expect(queryAllByTestId('grid-cell-wrapper')[0]).toContainElement(getByTestId('text-ellipsis'));
    expect(getByTestId('text-ellipsis')).toHaveTextContent('Cameroon');

    expect(queryAllByClass(container, 'treepickernode-component-metadata')).toHaveLength(0);

    expect(queryAllByTestId('grid-cell-wrapper')[1]).toHaveTextContent('400');
  });

  it('should render a provided node with an empty type', () => {
    const node = {
      id: '3',
      label: 'Toyota',
      type: '',
      value: 400,
      path: [{ id: '30', label: 'Cars' }],
    };
    const { getByTestId, queryAllByTestId, container } = render(<TreePickerNode itemType={itemType} node={node} />);

    expect(queryAllByTestId('grid-cell-wrapper')).toHaveLength(3); // meta data cell, value cell and include button cell
    expect(getByTestId('text-ellipsis').children).toHaveLength(2);
    expect(getByTestId('text-ellipsis')).toHaveTextContent('Toyota(Cars)');
    expect(getByClass(container, 'treepickernode-component-metadata')).toHaveTextContent('Cars');

    expect(queryAllByTestId('grid-cell-wrapper')[1]).toHaveTextContent('400');
  });

  it('should fire removeNode when clicking on the `remove` button', () => {
    const nodes = [cbrNode];
    const removeNode = (node) => _.remove(nodes, { id: node.id });
    const props = { itemType, node: cbrNode, removeNode, selected: true };
    const { queryAllByTestId, getByText, queryByText } = render(<TreePickerNode {...props} />);

    expect(queryAllByTestId('grid-cell-wrapper')).toHaveLength(3); // remove button cell, meta data cell and value cell
    expect(queryAllByTestId('grid-cell-wrapper')[0]).toContainElement(getByText('−'));
    expect(getByText('−').parentElement.tagName).toBe('BUTTON');
    expect(queryByText('−')).toBeInTheDocument();

    expect(nodes).toEqual([cbrNode]);
    fireEvent.click(getByText('−'));
    expect(nodes).toEqual([]);
  });

  it('should error on click of `remove` button without removeNode handler', () => {
    console.error = (err) => {
      throw new Error(err);
    };

    const { queryAllByTestId, getByText } = render(<TreePickerNode itemType={itemType} node={cbrNode} selected />);

    expect(queryAllByTestId('grid-cell-wrapper')).toHaveLength(3); // remove button cell, meta data cell and value cell

    expect(() => {
      fireEvent.click(getByText('−'));
    }).toThrow('AdslotUi TreePickerNode needs a removeNode handler');
  });

  it('should accept both strings and numbers as node ids', () => {
    const { getByTestId, rerender } = render(<TreePickerNode itemType={itemType} node={cbrNode} selected />);

    expect(getByTestId('grid-row-wrapper')).toHaveAttribute('data-test-selector', 'example-item-type-au-act-cbr');

    rerender(<TreePickerNode itemType={itemType} node={maleNode} />);

    expect(getByTestId('grid-row-wrapper')).toHaveAttribute('data-test-selector', 'example-item-type-4');
  });

  it('should throw error message when props does not contain `path` or `ancestors`', () => {
    console.error = (err) => {
      throw new Error(err);
    };
    const nodeWithoutPathAndAncestors = _.omit(cbrNode, ['path', 'ancestors']);
    expect(() => render(<TreePickerNode itemType={itemType} node={nodeWithoutPathAndAncestors} />)).toThrow(
      `AdslotUi TreePickerNode needs property 'path' or property 'ancestors'`
    );
  });

  it('should have popover element if addNodePopoverInfoProps exists', () => {
    const addInfoProps = {
      popoverContent: 'add',
    };

    const { queryAllByTestId } = render(
      <TreePickerNode itemType={itemType} node={cbrNode} addNodePopoverInfoProps={addInfoProps} />
    );

    expect(queryAllByTestId('popover-element')).toHaveLength(2); // text ellipsis and popover for add button
  });

  it('should have popover element if removeNodePopoverInfoProps exists', () => {
    const removeInfoProps = {
      popoverContent: 'remove',
    };

    const { queryAllByTestId } = render(
      <TreePickerNode itemType={itemType} node={cbrNode} selected removeNodePopoverInfoProps={removeInfoProps} />
    );

    expect(queryAllByTestId('popover-element')).toHaveLength(2); // text ellipsis and popover for remove button
  });
});
