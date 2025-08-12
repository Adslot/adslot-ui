import React from 'react';
import type { Preview } from '@storybook/react-vite';
import { Title, Subtitle, Description, Primary, ArgTypes, Stories } from '@storybook/addon-docs/blocks';
import theme from './theme';

import '../src/styles/bootstrap-custom.css';
import '../www/storybook.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
      expanded: true,
    },
    options: {
      storySort: {
        order: [
          'Getting Started',
          ['Introduction', 'Installation', 'Contributing'],
          'Design System',
          ['Design Guide', 'Usage', 'Colors', 'Typography', 'Border'],
          'Components',
          'Pending Review',
        ],
      },
    },
    layout: 'centered',
    docs: {
      theme: theme,
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description />
          <Primary />
          <ArgTypes />
          <Stories />
        </>
      ),
    },
  },
};

export default preview;
