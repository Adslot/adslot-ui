import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { getParameters } from 'codesandbox/lib/api/define';

const Sandbox = ({ component, title }) => {
  const [sandboxId, setSandboxId] = React.useState(null);

  React.useEffect(() => {
    const parameters = getParameters({
      files: {
        'index.jsx': {
          content: `import React from 'react';
import ReactDOM from 'react-dom';
import Example from './example';
import 'adslot-ui/dist/adslot-ui-main.css';

ReactDOM.render(
    <div style={{ padding: '50px' }}>
      <Example />
    </div>,
    document.getElementById('root')
);
    `,
        },
        'example.jsx': {
          content: component,
        },
        'package.json': {
          content: {
            main: 'index.jsx',
            dependencies: {
              lodash: '4.17.10',
              moment: '2.22.1',
              'adslot-ui': 'latest',
            },
          },
        },
      },
    });
    const url = `https://codesandbox.io/api/v1/sandboxes/define?embed=1&json=1&parameters=${parameters}`;

    async function createSandbox() {
      await axios.get(url).then(response => {
        setSandboxId(response.data.sandbox_id);
      });
    }
    createSandbox();
  }, []);

  return sandboxId ? (
    <iframe
      src={`https://codesandbox.io/embed/${sandboxId}?codemirror=1&module=example.jsx&fontsize=12&autoresize=1`}
      style={{ width: '100%', height: '600px', border: 0, borderRadius: '4px', overflow: 'hidden' }}
      allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
      sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
      title={title}
    ></iframe>
  ) : null;
};

Sandbox.propTypes = {
  component: PropTypes.node,
  title: PropTypes.string,
};

export default Sandbox;
