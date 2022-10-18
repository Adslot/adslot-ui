import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { MDXProvider } from '@mdx-js/react';
import GoogleAnalytics from './GoogleAnalytics';
import Scaffold from './Scaffold';
import CodeBlock from './CodeBlock';
import Props from './Props.jsx';
import DesignNotes from './DesignNotes.jsx';

import './styles.css';

const components = {
  pre: (props) => {
    const codeProps = {
      ...props,
      ...props.children.props,
    };
    return <CodeBlock {...codeProps} />;
  },
  DesignNotes,
  Props,
};

export class App extends Component {
  render() {
    return (
      <MDXProvider components={components}>
        <BrowserRouter>
          <Scaffold />
          {process.env.NODE_ENV === 'production' && <GoogleAnalytics />}
        </BrowserRouter>
      </MDXProvider>
    );
  }
}

export default App;
