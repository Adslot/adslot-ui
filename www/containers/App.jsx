import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { MDXProvider } from '@mdx-js/react';
import GoogleAnalytics from './GoogleAnalytics';
import Scaffold from './Scaffold';
import CodeBlock from './CodeBlock';
import './styles.scss';

const components = {
  pre: props => <div {...props} />,
  code: props => <CodeBlock {...props} />,
};

export class App extends Component {
  render() {
    return (
      <MDXProvider components={components}>
        <Router>
          <Scaffold />
          {process.env.NODE_ENV === 'production' && <GoogleAnalytics />}
        </Router>
      </MDXProvider>
    );
  }
}

export default App;
