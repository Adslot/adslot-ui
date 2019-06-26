import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/Layout';

const renderApp = () => {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('app')
  );
};

renderApp();
