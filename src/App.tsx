import React from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import classes from './App.module.scss';
import { routes } from './pages/routes/routeConfig';

function App() {
  return (
    <div className={classes['App']}>
      <Router>
        <Routes>
          {routes.map((route) => {
            const Component = route.component;

            return (
              <Route
                key={route.path}
                path={route.path}
                element={<Component />}
              />
            );
          })}
          <Route path="*" element={<Navigate to="/auth/login" replace />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
