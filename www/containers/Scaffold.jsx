import React from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import Header from './components/Header';
import SidePanel from './SidePanel';
import routes from './routes';
import NotFound from './NotFound';

export default function Scaffold() {
  const history = useHistory();

  React.useEffect(() => {
    const unlisten = history.listen(() => {
      window.scrollTo(0, 0);
    });
    return unlisten;
  }, [history]);

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
            <Route component={NotFound} />
          </Switch>
        </div>
      </div>
    </div>
  );
}
