import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from '../components/Header';
import SidePanel from './SidePanel';
import routes from './routes';

export default function Scaffold() {
  return (
    <div className="adslot-ui-layout">
      <Header />
      <div className="adslot-ui-body">
        <div className="adslot-ui-sidebar-area">
          <SidePanel />
        </div>
        <div className="adslot-ui-content-area">
          <Switch>
            {Object.keys(routes).map(key => (
              <Route key={key} path={routes[key].path} exact component={routes[key].component} />
            ))}
          </Switch>
        </div>
      </div>
    </div>
  );
}
