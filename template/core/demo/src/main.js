import React from 'react';

import {render} from 'react-dom';

import injectTapEventPlugin from 'react-tap-event-plugin';

import {
  Router,
  Route,
  hashHistory,
  /* eslint-disable no-unused-vars */
  IndexRoute,
  Redirect,
  /* eslint-enable */
} from 'react-router';

import App from './components/app';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const _fixRouterOnUpdate = () => {
  window.scrollTo(0, 0);
};

render((
  <Router
      history={hashHistory}
      onUpdate={_fixRouterOnUpdate}
  >
    <Route
        component={App}
        path="/"
    >
      {/* Route, IndexRoute, Redirect should be describe here */}
    </Route>
  </Router>
), document.getElementById('app'));
