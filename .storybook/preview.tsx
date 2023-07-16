import React from 'react';
import type { Preview } from '@storybook/react';
import { Title, Subtitle, Description, Primary, ArgTypes, Stories } from '@storybook/blocks';

import '../src/styles/bootstrap-custom.css';
import '../www/storybook.css';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on.*' },
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
