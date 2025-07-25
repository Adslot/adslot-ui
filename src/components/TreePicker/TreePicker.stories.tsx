import React from 'react';
import axios from 'axios';
import type { Meta, StoryObj } from '@storybook/react-vite';
import TreePicker from './index';

const meta = {
  title: 'Components/TreePicker',
  component: TreePicker,
} satisfies Meta<typeof TreePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

const NodeRender = ({ node }) => (
  <TreePicker.Node node={node}>
    <TreePicker.Node.Content>{node.label}</TreePicker.Node.Content>
    {node.type === 'comment' ? null : (
      <TreePicker.Node.Expand
        className="expand"
        disabled={node.type === 'test'}
        resolveNodes={async () => {
          if (node.type === 'user') {
            const res = await axios.get(`https://dummyjson.com/users/${node.id}/posts?limit=5`);
            return res.data.posts.map((entry) => ({
              ...entry,
              label: entry.title,
              type: 'post',
            }));
          }
          const res = await axios.get(`https://dummyjson.com/posts/${node.id}/comments?limit=5`);

          return res.data.comments.map((entry) => ({
            ...entry,
            label: entry.body,
            type: 'comment',
          }));
        }}
      />
    )}
    <TreePicker.Node.Add
      disabled={node.type !== 'comment'}
      onAdd={() => {
        // eslint-disable-next-line no-console
        console.log(`Added ${node.id}: ${node.label}`);
      }}
    />
  </TreePicker.Node>
);

export const Basic: Story = {
  args: {
    renderNode: (node) => <NodeRender node={node} />,

    children: (
      <>
        <TreePicker.Nav />
        <TreePicker.Header>Name</TreePicker.Header>
        <TreePicker.Search
          resolveNodes={async (searchText) => {
            const res = await axios.get(`https://dummyjson.com/posts/search?q=${searchText}`);

            return res.data.posts.map((post) => ({
              ...post,
              label: post.title,
              type: 'post',
            }));
          }}
        />
        <TreePicker.Tree
          resolveRootNodes={async () => {
            const res = await axios.get('https://dummyjson.com/users?limit=5');
            return res.data.users.map((entry) => ({
              ...entry,
              label: entry.firstName + ' ' + entry.lastName,
              type: 'user',
            }));
          }}
        />
      </>
    ),
  },
  render: (args) => (
    <div style={{ width: 500 }}>
      <TreePicker {...args} />
    </div>
  ),
};
