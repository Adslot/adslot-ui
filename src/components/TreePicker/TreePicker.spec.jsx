import _ from 'lodash';
import React from 'react';
import { render, screen, user, within, waitFor } from 'testing';

import TreePicker from '.';

const rootNodes = [
  { id: 'audience', label: 'Audience', type: 'root', header: 'Segment' },
  { id: 'site', label: 'Site', type: 'root', header: 'Segment' },
  { id: 'geo', label: 'Geo', type: 'root', header: 'Segment' },
];
const audSegmentNodes = [
  { id: '111', label: 'Fyllo', type: 'segment' },
  { id: '222', label: 'Acxiom', type: 'segment' },
];

const audSegmentValuesNodes = [{ id: '1111', label: 'MRI', type: 'value' }];

it('should display empty state when there is no root nodes', async () => {
  render(
    <TreePicker
      renderNode={(node) => (
        <TreePicker.Node node={node}>
          <TreePicker.Node.Content>
            {node.label} ({node.id})
          </TreePicker.Node.Content>
        </TreePicker.Node>
      )}
    >
      <TreePicker.Nav />
      <TreePicker.Header label="Label" />
      <TreePicker.Tree resolveRootNodes={() => null} />
    </TreePicker>
  );

  await waitFor(() => {
    expect(screen.getByText('Label')).toBeInTheDocument();
  });

  expect(screen.getByClass('aui--tree-picker-empty')).toBeInTheDocument();
  expect(screen.getByClass('empty-title')).toHaveTextContent('No Results.');
});

it('should display with root nodes', async () => {
  render(
    <TreePicker
      renderNode={(node) => (
        <TreePicker.Node node={node}>
          <TreePicker.Node.Content>
            {node.label} ({node.id})
          </TreePicker.Node.Content>
        </TreePicker.Node>
      )}
    >
      <TreePicker.Nav />
      <TreePicker.Header label="Label" />
      <TreePicker.Tree resolveRootNodes={() => rootNodes} />
    </TreePicker>
  );

  await waitFor(() => {
    expect(screen.getByText('Label')).toBeInTheDocument();
  });

  expect(screen.getByClass('tree-picker')).toBeInTheDocument();

  const treePickerTree = screen.getByClass('aui--tree-picker-tree');

  const nodes = within(treePickerTree).getAllByClass('aui--tree-picker-row-content');
  expect(nodes).toHaveLength(3);

  expect(_.map(nodes, (n) => n.textContent).sort()).toEqual(['Audience (audience)', 'Site (site)', 'Geo (geo)'].sort());
});

it('should hide all hidden nodes', async () => {
  render(
    <TreePicker
      renderNode={(node) => (
        <TreePicker.Node node={node}>
          <TreePicker.Node.Content>{node.label}</TreePicker.Node.Content>
        </TreePicker.Node>
      )}
    >
      <TreePicker.Nav />
      <TreePicker.Header label="Label" />
      <TreePicker.Tree resolveRootNodes={() => rootNodes} hiddenNodeIds={['geo', 'site']} />
    </TreePicker>
  );

  await waitFor(() => {
    expect(screen.getByText('Label')).toBeInTheDocument();
  });

  expect(screen.getByText('Audience')).toBeInTheDocument();
  expect(screen.queryByText('Site')).not.toBeInTheDocument();
  expect(screen.queryByText('Geo')).not.toBeInTheDocument();
});

it('should display nodes and header correctly when clicking expandable node', async () => {
  render(
    <TreePicker
      renderNode={(node) => (
        <TreePicker.Node node={node}>
          <TreePicker.Node.Content>{node.label}</TreePicker.Node.Content>
          <TreePicker.Node.Add disabled={node.type === 'root'} onAdd={() => _.noop} />
          <TreePicker.Node.Expand disabled={node.id === 'site'} resolveNodes={() => audSegmentNodes} />
        </TreePicker.Node>
      )}
    >
      <TreePicker.Nav />
      <TreePicker.Header />
      <TreePicker.Tree resolveRootNodes={() => rootNodes} />
    </TreePicker>
  );

  await waitFor(() => {
    expect(screen.getByText('Audience')).toBeInTheDocument();
  });

  let includeAllBtn = screen.queryByClass('aui--tree-picker-header-add-all');
  let headerContent = screen.queryByClass('aui--tree-picker-header');
  let nodes = within(screen.getByClass('aui--tree-picker-tree')).getAllByClass('aui--tree-picker-row-content');

  expect(nodes).toHaveLength(3);
  expect(includeAllBtn).not.toBeInTheDocument();
  expect(headerContent).not.toBeInTheDocument();

  const nodeExpands = screen.getAllByClass('aui--tree-picker-node-expand');
  expect(nodeExpands).toHaveLength(3);
  expect(nodeExpands[1]).toHaveClass('disabled');

  await user.click(nodeExpands[1]); // disabled
  includeAllBtn = screen.queryByClass('aui--tree-picker-header-add-all');
  expect(within(screen.getByClass('aui--tree-picker-tree')).getAllByClass('aui--tree-picker-row-content')).toHaveLength(
    3
  ); // still render root nodes
  expect(includeAllBtn).not.toBeInTheDocument();

  await user.click(nodeExpands[0]);

  nodes = within(screen.getByClass('aui--tree-picker-tree')).getAllByClass('aui--tree-picker-row-content');
  expect(nodes).toHaveLength(2);
  expect(_.map(nodes, (n) => n.textContent).sort()).toEqual(['Fyllo', 'Acxiom'].sort());

  headerContent = screen.getByClass('aui--tree-picker-header');
  expect(headerContent).toHaveTextContent('Segment');

  includeAllBtn = screen.getByClass('aui--tree-picker-header-add-all');
  expect(includeAllBtn).toBeInTheDocument(); // include all button
});

it('should display nodes correctly when expanding and navigating', async () => {
  render(
    <TreePicker
      renderNode={(node) => (
        <TreePicker.Node node={node}>
          <TreePicker.Node.Content>{node.label}</TreePicker.Node.Content>
          <TreePicker.Node.Expand
            resolveNodes={() => {
              if (node.id === 'audience') return audSegmentNodes;
              if (node.id === '111') return audSegmentValuesNodes;
              if (node.id === '222') return null;
              if (node.id === '1111') return [];
            }}
          />
        </TreePicker.Node>
      )}
    >
      <TreePicker.Nav />
      <TreePicker.Tree resolveRootNodes={() => rootNodes} />
    </TreePicker>
  );

  await waitFor(() => {
    expect(screen.getByText('Audience')).toBeInTheDocument();
  });

  expect(screen.queryByClass('aui--tree-picker-header')).not.toBeInTheDocument();

  const nodeExpands = screen.getAllByClass('aui--tree-picker-node-expand');

  // Expanding audience node (id:audience )
  await user.click(nodeExpands[0]);
  let nodes = screen.getAllByClass('aui--tree-picker-row-content');
  expect(nodes).toHaveLength(2); // 2 audSegmentNodes

  let navNodes = screen.getAllByClass('aui--breadcrumb-node');

  expect(navNodes).toHaveLength(2);
  expect(navNodes.map((node) => node.textContent)).toEqual(['All', 'Audience']);

  // Expanding Acxiom node (id:222)
  await user.click(screen.getAllByClass('aui--tree-picker-node-expand')[1]);
  nodes = screen.getAllByClass('aui--tree-picker-row-content');
  expect(nodes).toHaveLength(2); // still render current nodes:2 audSegmentNodes

  // Expanding Fyllo node (id:111)
  await user.click(screen.getAllByClass('aui--tree-picker-node-expand')[0]);

  navNodes = screen.getAllByClass('aui--breadcrumb-node');
  expect(navNodes).toHaveLength(3);
  expect(navNodes.map((node) => node.textContent)).toEqual(['All', 'Audience', 'Fyllo']);

  expect(screen.getAllByClass('aui--tree-picker-row-content')).toHaveLength(1); //1 audSegmentValuesNodes

  // Expanding MRI node (id: 1111)
  await user.click(screen.getAllByClass('aui--tree-picker-node-expand')[0]); // 0 node
  const emptyTreePicker = screen.getByClass('aui--tree-picker-empty');
  expect(emptyTreePicker).toBeInTheDocument();
  expect(within(emptyTreePicker).getByClass('empty-title')).toHaveTextContent('No Results.');

  await user.click(within(emptyTreePicker).getByText('Go Back'));
  expect(screen.getAllByClass('aui--tree-picker-row-content')).toHaveLength(1); //1 audSegmentValuesNodes

  // Clicking Audience nav node
  await user.click(navNodes[1]);
  nodes = screen.getAllByClass('aui--tree-picker-row-content');
  expect(nodes).toHaveLength(2); // 2 audSegmentNodes

  // Clicking All nav node
  await user.click(navNodes[0]);
  nodes = screen.getAllByClass('aui--tree-picker-row-content');
  expect(nodes).toHaveLength(3); // 3 rootNodes
});

it('should expand nodes inline correctly when inline flag set to true', async () => {
  render(
    <TreePicker
      renderNode={(node) => (
        <TreePicker.Node node={node}>
          <TreePicker.Node.Content>{node.label}</TreePicker.Node.Content>
          <TreePicker.Node.Expand
            inline={true}
            resolveNodes={() => {
              if (node.id === 'audience') return audSegmentNodes;
              if (node.id === '111') return audSegmentValuesNodes;
              if (node.id === '222') return [{ id: 'hidden-node-1', label: 'Hidden Node' }];
              return [{ id: '11111', label: 'MRI-sub-node' }];
            }}
          />
        </TreePicker.Node>
      )}
    >
      <TreePicker.Nav />
      <TreePicker.Tree resolveRootNodes={() => rootNodes} hiddenNodeIds={['hidden-node-1']} />
    </TreePicker>
  );

  await waitFor(() => {
    expect(screen.getByText('Audience')).toBeInTheDocument();
  });

  let nodeExpanders = screen.getAllByClass('aui--tree-picker-node-expand');

  // Expanding audience node
  await user.click(nodeExpanders[0]);

  const nodeBranch = screen.getByClass('aui--tree-picker-node-branch');
  expect(nodeBranch).toBeInTheDocument();
  expect(nodeBranch).toHaveClass('is-odd');

  const inlineNodes = within(nodeBranch).getAllByClass('aui--tree-picker-row');
  expect(inlineNodes).toHaveLength(2); // 2 audSegmentNodes

  // Expanding the inline audience (Fyllo) node:
  let expander = within(inlineNodes[0]).getByClass('aui--tree-picker-node-expand');
  await user.click(expander);

  let nodeBranches = screen.getAllByClass('aui--tree-picker-node-branch');
  expect(nodeBranches).toHaveLength(2);
  expect(nodeBranches[1]).toHaveClass('is-even');

  // Expanding the inline audience (Acxiom) node:
  expander = within(inlineNodes[1]).getByClass('aui--tree-picker-node-expand');
  await user.click(expander);

  nodeBranches = screen.getAllByClass('aui--tree-picker-node-branch');
  expect(nodeBranches).toHaveLength(2); // still two branches

  // Expanding the inline audience value (MRI) node:
  expander = within(nodeBranches[1]).getAllByClass('aui--tree-picker-node-expand')[0];
  await user.click(expander);

  nodeBranches = screen.getAllByClass('aui--tree-picker-node-branch');
  expect(nodeBranches).toHaveLength(3);
  expect(nodeBranches[2]).toHaveClass('is-odd');
});

it('should trigger props.onAdd when add node and include all nodes', async () => {
  const onAdd = jest.fn();
  render(
    <TreePicker
      renderNode={(node) => (
        <TreePicker.Node node={node}>
          <TreePicker.Node.Content>{node.label}</TreePicker.Node.Content>
          <TreePicker.Node.Expand resolveNodes={() => audSegmentNodes} />
          <TreePicker.Node.Add onAdd={onAdd} />;
        </TreePicker.Node>
      )}
    >
      <TreePicker.Nav />
      <TreePicker.Header label="Label" />
      <TreePicker.Tree resolveRootNodes={() => rootNodes} />
    </TreePicker>
  );

  await waitFor(() => {
    expect(screen.getByText('Audience')).toBeInTheDocument();
  });

  const nodeAddButtons = screen.getAllByClass('aui--tree-picker-node-add');
  expect(nodeAddButtons).toHaveLength(3);

  const includeAllButton = screen.getByClass('aui--tree-picker-header-add-all');
  expect(includeAllButton).toBeInTheDocument();

  await user.click(nodeAddButtons[0]); // add first root node

  expect(onAdd).toHaveBeenCalledTimes(1);
  expect(onAdd).toHaveBeenCalledWith(rootNodes[0], false);

  await user.click(includeAllButton); // include all root nodes
  expect(onAdd).toHaveBeenCalledTimes(4);
  expect(onAdd).toHaveBeenNthCalledWith(2, rootNodes[0], true);
  expect(onAdd).toHaveBeenNthCalledWith(3, rootNodes[1], true);
  expect(onAdd).toHaveBeenNthCalledWith(4, rootNodes[2], true);
});

it('should trigger resolveNodes when searching and be able to clear search nodes', async () => {
  const resolveSearchNodes = jest
    .fn()
    .mockImplementationOnce(() => null)
    .mockImplementationOnce(() => [{ id: 1, label: 'search node' }]);

  render(
    <TreePicker
      renderNode={(node) => (
        <TreePicker.Node node={node}>
          <TreePicker.Node.Content>{node.label}</TreePicker.Node.Content>
          <TreePicker.Node.Expand resolveNodes={() => audSegmentNodes} />
        </TreePicker.Node>
      )}
    >
      <TreePicker.Search placeholder="Search" resolveNodes={resolveSearchNodes} />
      <TreePicker.Tree resolveRootNodes={() => rootNodes} />
    </TreePicker>
  );

  await waitFor(() => {
    expect(screen.getByText('Audience')).toBeInTheDocument();
  });

  const treePickerSearch = screen.getByClass('aui--tree-picker-search');
  expect(treePickerSearch).toBeInTheDocument();

  await user.type(screen.getByPlaceholderText('Search'), 'f');
  await user.type(screen.getByPlaceholderText('Search'), 'oo');

  expect(resolveSearchNodes).toHaveBeenCalledTimes(3);
  expect(resolveSearchNodes).toHaveBeenLastCalledWith('foo', null);

  let nodes = screen.getAllByClass('aui--tree-picker-row-content');
  expect(nodes).toHaveLength(1);
  expect(nodes[0]).toHaveTextContent('search node');

  await user.click(screen.getByTestId('close-icon')); // clear search, clear search nodes
  nodes = screen.getAllByClass('aui--tree-picker-row-content');
  expect(nodes).toHaveLength(3);
});

it('should be able to reset to root nodes when no search results', async () => {
  const resolveNodes = jest.fn().mockReturnValue([]);
  render(
    <TreePicker
      renderNode={(node) => (
        <TreePicker.Node node={node}>
          <TreePicker.Node.Content>{node.label}</TreePicker.Node.Content>
          <TreePicker.Node.Expand resolveNodes={() => audSegmentNodes} />
        </TreePicker.Node>
      )}
    >
      <TreePicker.Search placeholder="Search" resolveNodes={resolveNodes} />
      <TreePicker.Tree resolveRootNodes={() => rootNodes} />
    </TreePicker>
  );

  await waitFor(() => {
    expect(screen.getByText('Audience')).toBeInTheDocument();
  });

  const treePickerSearch = screen.getByClass('aui--tree-picker-search');
  expect(treePickerSearch).toBeInTheDocument();

  await user.click(screen.getByPlaceholderText('Search'));
  await user.paste('test');

  expect(screen.queryByClass('aui--tree-picker-row-content')).not.toBeInTheDocument();

  expect(screen.getByClass('aui--tree-picker-empty')).toBeInTheDocument();
  await user.click(screen.getByText('Reset Search'));

  expect(screen.getAllByClass('aui--tree-picker-row-content')).toHaveLength(3); // reset to root nodes
});

it('should log error and display an empty state when failing to resolve root nodes', async () => {
  jest.spyOn(console, 'error').mockReturnValue();
  const resolveRootNodes = jest.fn().mockRejectedValue({ error: 'Failed.' });

  render(
    <TreePicker
      renderNode={(node) => (
        <TreePicker.Node node={node}>
          <TreePicker.Node.Content>{node.label}</TreePicker.Node.Content>
        </TreePicker.Node>
      )}
    >
      <TreePicker.Tree resolveRootNodes={resolveRootNodes} />
    </TreePicker>
  );

  await waitFor(() => {
    expect(screen.getByClass('aui--tree-picker-empty')).toBeInTheDocument();
  });

  expect(console.error).toHaveBeenCalledTimes(1);
  expect(console.error).toHaveBeenCalledWith('[TreePickerTree]', { error: 'Failed.' });
});

it('should log error for failed node resolution during search', async () => {
  jest.spyOn(console, 'error').mockReturnValue();
  const resolveMatchedNodes = jest.fn().mockRejectedValue({ error: 'Failed.' });

  render(
    <TreePicker
      renderNode={(node) => (
        <TreePicker.Node node={node}>
          <TreePicker.Node.Content>{node.label}</TreePicker.Node.Content>
        </TreePicker.Node>
      )}
    >
      <TreePicker.Search placeholder="Search" resolveNodes={resolveMatchedNodes} />
      <TreePicker.Tree resolveRootNodes={() => rootNodes} />
    </TreePicker>
  );

  await waitFor(() => {
    expect(screen.getByText('Audience')).toBeInTheDocument();
  });

  const searchInput = within(screen.getByClass('aui--tree-picker-search')).getByTestId('search-input');

  await user.click(searchInput);
  await user.paste('test');

  expect(console.error).toHaveBeenCalledTimes(1);
  expect(console.error).toHaveBeenCalledWith('[TreePickerSearch]', { error: 'Failed.' });
});

it('should log error for failed node resolution during expanding', async () => {
  jest.spyOn(console, 'error').mockReturnValue();
  const resolveExpandedNodes = jest.fn().mockRejectedValue({ error: 'Failed.' });

  render(
    <TreePicker
      renderNode={(node) => (
        <TreePicker.Node node={node}>
          <TreePicker.Node.Content>{node.label}</TreePicker.Node.Content>
          <TreePicker.Node.Expand resolveNodes={resolveExpandedNodes} />
        </TreePicker.Node>
      )}
    >
      <TreePicker.Tree resolveRootNodes={() => rootNodes} />
    </TreePicker>
  );

  await waitFor(() => {
    expect(screen.getByText('Audience')).toBeInTheDocument();
  });

  // expanding audience node
  await user.click(screen.getAllByClass('aui--tree-picker-node-expand')[0]);

  expect(console.error).toHaveBeenCalledTimes(1);
  expect(console.error).toHaveBeenCalledWith('[TreePickerNodeExpand]', { error: 'Failed.' });
});

it('should do nothing when expand resolveNodes() is not provided', async () => {
  render(
    <TreePicker
      renderNode={(node) => (
        <TreePicker.Node node={node}>
          <TreePicker.Node.Content>{node.label}</TreePicker.Node.Content>
          <TreePicker.Node.Expand />
        </TreePicker.Node>
      )}
    >
      <TreePicker.Tree resolveRootNodes={() => rootNodes} />
    </TreePicker>
  );

  await waitFor(() => {
    expect(screen.getByText('Audience')).toBeInTheDocument();
  });

  let nodesContent = within(screen.getByClass('aui--tree-picker-tree')).getAllByClass('aui--tree-picker-row-content');
  expect(nodesContent).toHaveLength(3);
  expect(_.map(nodesContent, (n) => n.textContent).sort()).toEqual(['Audience', 'Site', 'Geo'].sort());

  // expanding audience node
  await user.click(screen.getAllByClass('aui--tree-picker-node-expand')[0]);

  // remaining the same nodes:
  nodesContent = within(screen.getByClass('aui--tree-picker-tree')).getAllByClass('aui--tree-picker-row-content');
  expect(nodesContent).toHaveLength(3);

  expect(_.map(nodesContent, (n) => n.textContent).sort()).toEqual(['Audience', 'Site', 'Geo'].sort());
});
