import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './Layout';

const renderApp = () => {
  ReactDOM.render(
    <AppContainer>
      <App />
    </AppContainer>,
    document.getElementById('app')
  );
};

renderApp();

if (module.hot) {
  module.hot.accept('./Layout', renderApp);
}
