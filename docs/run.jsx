import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Layout from './components/Layout';

const renderApp = App => {
  ReactDOM.render(
    <AppContainer>
      <App />
    </AppContainer>,
    document.getElementById('app')
  );
};

renderApp(Layout);

if (module.hot) {
  module.hot.accept('./components/Layout', () => {
    const NextLayout = require('./components/Layout').default; // eslint-disable-line
    renderApp(NextLayout);
  });
}
