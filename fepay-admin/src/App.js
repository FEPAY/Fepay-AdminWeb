import React from 'react';
import { BrowserRouter as Router,  Route, Switch } from 'react-router-dom';

import LoginPage from './pages/Login';
import AnalyticsPage from './pages/Analytics';
import Register from './pages/Register';
import MembersPage from './pages/Members';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={LoginPage} />
        <Route path='/analytics' render={() => {
          if(localStorage.getItem('access')) {
            return <AnalyticsPage />
          } else {
            return <LoginPage />
          }
        }} />
        <Route path='/register' component={Register} />
        <Route path='/members' render={() => {
          if(localStorage.getItem('access')) {
            return <MembersPage />
          } else {
            return <LoginPage />
          }
        }} />
      </Switch>
    </Router>
  );
}

export default App;
