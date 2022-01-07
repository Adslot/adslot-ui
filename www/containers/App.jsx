import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { MDXProvider } from '@mdx-js/react';
import GoogleAnalytics from './GoogleAnalytics';
import Scaffold from './Scaffold';
import CodeBlock from './CodeBlock';
import './styles.scss';

const components = {
  pre: (props) => <div {...props} />,
  code: (props) => <CodeBlock {...props} />,
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
