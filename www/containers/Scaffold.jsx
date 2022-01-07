import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import SidePanel from './SidePanel';
import routes from './routes';
import NotFound from './NotFound';

export default function Scaffold() {
  const location = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="adslot-ui-layout">
      <Header />
      <div className="adslot-ui-body">
        <div className="adslot-ui-sidebar-area">
          <SidePanel />
        </div>
        <div className="adslot-ui-content-area">
          <Routes>
            {Object.keys(routes).map((key) => {
              const Component = routes[key].component;
              return <Route key={key} path={routes[key].path} element={<Component />} />;
            })}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
