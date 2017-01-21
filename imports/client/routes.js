import React from 'react';
import { render } from 'react-dom';
import {
  Router,
  Route,
  IndexRoute,
  browserHistory
} from 'react-router';

import MainLayout from './ui/layouts/MainLayout';
import App from './ui/App';
import About from './ui/pages/About'

Meteor.startup(() => {
  render(
    <Router history={browserHistory}>
      <Route path='/' component={MainLayout}>
        <IndexRoute component={App} />
        <Route path='/about' component={About} />
        <Route path='/items/:id' component={App} />
      </Route>
    </Router>,
    document.getElementById('render-target'));
});
