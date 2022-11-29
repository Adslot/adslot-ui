import _ from 'lodash';
import React from 'react';
import { render, screen, user } from 'testing';
import TreePickerNode from '.';
import { invariant } from '../../../lib/utils';
import TreePickerMocks from '../mocks';

describe('<TreePickerNode />', () => {
  const { cbrNode, cbrNodeAlreadySelected, actNode, maleNode, itemType, nodeRenderer } = TreePickerMocks;

  it('should render a node with defaults', () => {
    render(<TreePickerNode itemType={itemType} node={cbrNode} includeNode={jest.fn()} removeNode={jest.fn()} />);

    expect(screen.getByTestId('treepicker-node-wrapper')).toHaveClass('treepickernode-component child-node');

    expect(screen.getByTestId('grid-row-wrapper')).toHaveAttribute(
      'data-test-selector',
      `${_.kebabCase(itemType)}-${cbrNode.id}`
    );

    expect(screen.getAllByTestId('grid-cell-wrapper')).toHaveLength(3);
    expect(screen.getAllByTestId('grid-cell-wrapper')[2]).toContainElement(screen.getByText('+'));
    expect(screen.getByText('+').parentElement.tagName).toBe('BUTTON');
    expect(screen.getByText('+')).toBeInTheDocument();

    expect(screen.getAllByTestId('grid-cell-wrapper')[0]).toContainElement(screen.getByTestId('text-ellipsis'));
    expect(screen.getByTestId('text-ellipsis')).toBeInTheDocument();
    expect(screen.getByTestId('text-ellipsis')).toHaveTextContent('Canberra');

    expect(screen.getByClass('treepickernode-component-metadata')).toBeInTheDocument();
    expect(screen.getByClass('treepickernode-component-metadata')).toHaveTextContent('(City in ACT, AU)');
    expect(screen.getByText('ACT, AU')).toHaveClass('treepickernode-component-path');

    expect(screen.getByText('2000')).toHaveClass('grid-component-cell');
    expect(screen.getAllByTestId('grid-cell-wrapper')[2]).toHaveClass('grid-component-cell-button');
  });

  it('should render metadata of nodes already selected containing ancestory data', () => {
    render(
      <TreePickerNode
        itemType={itemType}
        node={cbrNodeAlreadySelected}
        includeNode={jest.fn()}
        removeNode={jest.fn()}
      />
    );

    expect(screen.getAllByClass('treepickernode-component-metadata')).toHaveLength(1);
    expect(screen.getByClass('treepickernode-component-metadata')).toHaveTextContent('(City in ACT, AU)');
    expect(screen.getByText('ACT, AU')).toHaveClass('treepickernode-component-path');
  });

  it('should render node via nodeRenderer', () => {
    render(
      <TreePickerNode
        itemType={itemType}
        node={actNode}
        nodeRenderer={nodeRenderer}
        includeNode={jest.fn()}
        removeNode={jest.fn()}
      />
    );

    expect(screen.getByTestId('text-ellipsis')).toContainElement(
      screen.getByText('Test value: Australian Capital Territory')
    );
  });

  it('should have correct accent color', () => {
    const view = render(
      <TreePickerNode
        itemType={itemType}
        node={{ ...actNode, accent: 'error' }}
        nodeRenderer={nodeRenderer}
        includeNode={jest.fn()}
        removeNode={jest.fn()}
      />
    );

    expect(screen.getByTestId('treepicker-node-wrapper')).toHaveClass('is-error');
    view.rerender(
      <TreePickerNode
        itemType={itemType}
        node={{ ...actNode, accent: 'warning' }}
        nodeRenderer={nodeRenderer}
        includeNode={jest.fn()}
        removeNode={jest.fn()}
      />
    );
    expect(screen.getByTestId('treepicker-node-wrapper')).toHaveClass('is-warning');
  });

  it('should render unselectable nodes with an include button', () => {
    render(<TreePickerNode itemType={itemType} node={actNode} includeNode={jest.fn()} removeNode={jest.fn()} />);

    expect(screen.getAllByTestId('grid-cell-wrapper')).toHaveLength(3); // meta data cell and value cell
    expect(screen.getByText('+').parentElement.tagName).toBe('BUTTON');
    expect(screen.getByText('+')).toBeInTheDocument();
  });

  it('should render the button first when selected is true', () => {
    render(
      <TreePickerNode itemType={itemType} node={cbrNode} selected includeNode={jest.fn()} removeNode={jest.fn()} />
    );

    expect(screen.getAllByTestId('grid-cell-wrapper')).toHaveLength(3); // remove button cell, meta data cell and value cell
    expect(screen.getAllByTestId('grid-cell-wrapper')[0]).toHaveAttribute('data-test-selector', 'button-remove');
    expect(screen.getByText('−').parentElement.tagName).toBe('BUTTON');
    expect(screen.getByText('−')).toBeInTheDocument();
  });

  it('should render button as disabled when disabled is true', async () => {
    const testFunction = jest.fn();
    render(
      <TreePickerNode
        itemType={itemType}
        node={cbrNode}
        removeNode={testFunction}
        selected
        disabled
        includeNode={jest.fn()}
      />
    );
    expect(screen.getByText('−').closest('button')).toBeDisabled();

    await user.click(screen.getByText('−'));
    expect(testFunction).toHaveBeenCalledTimes(0);
  });

  it('should filter value when provided', () => {
    const valueFormatter = (value) => `€${value / 100}`;
    render(
      <TreePickerNode
        itemType={itemType}
        node={cbrNode}
        valueFormatter={valueFormatter}
        includeNode={jest.fn()}
        removeNode={jest.fn()}
      />
    );

    expect(screen.getAllByTestId('grid-cell-wrapper')[1]).toHaveTextContent('€20');
  });

  it('should hide value when no value Number', () => {
    const node = _.clone(cbrNode);
    delete node.value;
    const props = { itemType, node };
    render(<TreePickerNode {...props} includeNode={jest.fn()} removeNode={jest.fn()} />);

    expect(screen.getAllByTestId('grid-cell-wrapper')).toHaveLength(2);
    expect(screen.getAllByTestId('grid-cell-wrapper')[0]).toHaveTextContent('Canberra(City in ACT, AU)');
    expect(screen.getAllByTestId('grid-cell-wrapper')[1]).toHaveTextContent('+');
  });

  it('should not have the child node class for root nodes', () => {
    render(<TreePickerNode itemType={itemType} node={maleNode} includeNode={jest.fn()} removeNode={jest.fn()} />);
    expect(screen.getByTestId('treepicker-node-wrapper')).toHaveClass('treepickernode-component');
  });

  it('should have the child node class for child nodes', () => {
    render(<TreePickerNode itemType={itemType} node={cbrNode} includeNode={jest.fn()} removeNode={jest.fn()} />);
    expect(screen.getByTestId('treepicker-node-wrapper')).toHaveClass('treepickernode-component child-node');
  });

  it('should fire expandNode when clicking on the label cell', async () => {
    const mockExpand = jest.fn();
    render(
      <TreePickerNode
        itemType={itemType}
        node={cbrNode}
        expandNode={mockExpand}
        includeNode={jest.fn()}
        removeNode={jest.fn()}
      />
    );

    expect(screen.getAllByTestId('grid-cell-wrapper')[0]).toHaveAttribute('data-test-selector', 'label');

    await user.click(screen.getAllByTestId('grid-cell-wrapper')[0]);
    expect(mockExpand).toHaveBeenCalledTimes(1);
  });

  it('should not show the expander element when the node is not expandable', async () => {
    const props = {
      mockExpand: jest.fn(),
      node: _.defaults({ isExpandable: false }, cbrNode),
      itemType,
    };

    render(<TreePickerNode {...props} includeNode={jest.fn()} removeNode={jest.fn()} />);

    expect(screen.getAllByTestId('grid-cell-wrapper')).toHaveLength(3); // meta data cell, value cell and include button cell

    await user.click(screen.getAllByTestId('grid-cell-wrapper')[0]);
    expect(props.mockExpand).toHaveBeenCalledTimes(0);
  });

  it('should not show the expander element when the node is expandable and no expandNode is given', () => {
    const props = {
      node: _.defaults({ isExpandable: true }, cbrNode),
      itemType,
    };

    render(<TreePickerNode {...props} includeNode={jest.fn()} removeNode={jest.fn()} />);
    expect(screen.queryByDts('expander')).not.toBeInTheDocument();
  });

  it('should fire includeNode when clicking on the `include` button', async () => {
    const nodes = [];
    const includeNode = (node) => nodes.push(node);
    render(<TreePickerNode itemType={itemType} node={cbrNode} includeNode={includeNode} removeNode={jest.fn()} />);

    expect(screen.getAllByTestId('grid-cell-wrapper')).toHaveLength(3); // meta data cell, value cell and include button cell
    await user.click(screen.getByText('+'));
    expect(nodes).toEqual([cbrNode]);
  });

  it('should error on click of `include` button without includeNode handler', async () => {
    jest.spyOn(console, 'error').mockReturnValue();
    render(<TreePickerNode itemType={itemType} node={cbrNode} />);
    expect(screen.getAllByTestId('grid-cell-wrapper')).toHaveLength(3); // meta data cell, value cell and include button cell

    await user.click(screen.getByText('+'));
    expect(console.error).toHaveBeenCalledWith('AdslotUi TreePickerNode needs an includeNode handler for au-act-cbr');
  });

  it('should render a provided node with an empty breadcrumb array', () => {
    const node = {
      id: '3',
      label: 'Cameroon',
      type: 'Country',
      value: 400,
      path: [],
    };
    render(<TreePickerNode itemType={itemType} node={node} includeNode={jest.fn()} removeNode={jest.fn()} />);

    expect(screen.getAllByTestId('grid-cell-wrapper')).toHaveLength(3); // meta data cell, value cell and include button cell

    expect(screen.getAllByTestId('grid-cell-wrapper')[0]).toContainElement(screen.getByTestId('text-ellipsis'));
    expect(screen.getByTestId('text-ellipsis')).toHaveTextContent('Cameroon');

    expect(screen.queryByClass('treepickernode-component-metadata')).not.toBeInTheDocument();

    expect(screen.getAllByTestId('grid-cell-wrapper')[1]).toHaveTextContent('400');
  });

  it('should render a provided node with an empty type', () => {
    const node = {
      id: '3',
      label: 'Toyota',
      type: '',
      value: 400,
      path: [{ id: '30', label: 'Cars' }],
    };
    render(<TreePickerNode itemType={itemType} node={node} includeNode={jest.fn()} removeNode={jest.fn()} />);

    expect(screen.getAllByTestId('grid-cell-wrapper')).toHaveLength(3); // meta data cell, value cell and include button cell
    expect(screen.getByTestId('text-ellipsis').children).toHaveLength(2);
    expect(screen.getByTestId('text-ellipsis')).toHaveTextContent('Toyota(Cars)');
    expect(screen.getByClass('treepickernode-component-metadata')).toHaveTextContent('Cars');

    expect(screen.getAllByTestId('grid-cell-wrapper')[1]).toHaveTextContent('400');
  });

  it('should fire removeNode when clicking on the `remove` button', async () => {
    const nodes = [cbrNode];
    const removeNode = (node) => _.remove(nodes, { id: node.id });
    const props = { itemType, node: cbrNode, removeNode, selected: true };
    render(<TreePickerNode {...props} includeNode={jest.fn()} />);

    expect(screen.getAllByTestId('grid-cell-wrapper')).toHaveLength(3); // remove button cell, meta data cell and value cell
    expect(screen.getAllByTestId('grid-cell-wrapper')[0]).toContainElement(screen.getByText('−'));
    expect(screen.getByText('−').parentElement.tagName).toBe('BUTTON');
    expect(screen.getByText('−')).toBeInTheDocument();

    expect(nodes).toEqual([cbrNode]);
    await user.click(screen.getByText('−'));
    expect(nodes).toEqual([]);
  });

  it('should error on click of `remove` button without removeNode handler', async () => {
    jest.spyOn(console, 'error').mockReturnValue();
    render(<TreePickerNode itemType={itemType} node={cbrNode} selected />);

    expect(screen.getAllByTestId('grid-cell-wrapper')).toHaveLength(3); // remove button cell, meta data cell and value cell

    await user.click(screen.getByText('−'));

    expect(console.error).toHaveBeenCalledWith('AdslotUi TreePickerNode needs a removeNode handler for au-act-cbr');
  });

  it('should accept both strings and numbers as node ids', () => {
    const view = render(
      <TreePickerNode itemType={itemType} node={cbrNode} selected includeNode={jest.fn()} removeNode={jest.fn()} />
    );

    expect(screen.getByTestId('grid-row-wrapper')).toHaveAttribute(
      'data-test-selector',
      'example-item-type-au-act-cbr'
    );

    view.rerender(
      <TreePickerNode itemType={itemType} node={maleNode} includeNode={jest.fn()} removeNode={jest.fn()} />
    );

    expect(screen.getByTestId('grid-row-wrapper')).toHaveAttribute('data-test-selector', 'example-item-type-4');
  });

  it('should throw error message when props does not contain `path` or `ancestors`', () => {
    const nodeWithoutPathAndAncestors = _.omit(cbrNode, ['path', 'ancestors']);
    render(
      <TreePickerNode
        itemType={itemType}
        node={nodeWithoutPathAndAncestors}
        includeNode={jest.fn()}
        removeNode={jest.fn()}
      />
    );
    expect(invariant).toHaveBeenCalledWith(
      false,
      `TreePickerNode needs property 'path' or property 'ancestors' for au-act-cbr`
    );
  });

  it('should have popover element if addNodePopoverInfoProps exists', () => {
    const addInfoProps = {
      popoverContent: 'add',
    };

    render(
      <TreePickerNode
        itemType={itemType}
        node={cbrNode}
        addNodePopoverInfoProps={addInfoProps}
        includeNode={jest.fn()}
        removeNode={jest.fn()}
      />
    );

    expect(screen.getAllByTestId('popover-element')).toHaveLength(2); // text ellipsis and popover for add button
  });

  it('should have popover element if removeNodePopoverInfoProps exists', () => {
    const removeInfoProps = {
      popoverContent: 'remove',
    };

    render(
      <TreePickerNode
        itemType={itemType}
        node={cbrNode}
        selected
        removeNodePopoverInfoProps={removeInfoProps}
        includeNode={jest.fn()}
        removeNode={jest.fn()}
      />
    );

    expect(screen.getAllByTestId('popover-element')).toHaveLength(2); // text ellipsis and popover for remove button
  });
});
