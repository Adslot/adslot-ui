import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './components/Layout';

const renderApp = () => {
  ReactDOM.render(
    <AppContainer>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </AppContainer>,
    document.getElementById('app')
  );
};

renderApp();

if (module.hot) {
  module.hot.accept('./components/Layout', renderApp);
}
