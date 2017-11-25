import "phoenix_html"
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Landing from './containers/Landing';

ReactDOM.render(
  <Provider store={store} >
    <BrowserRouter>
      <Route exact path="/" component={Landing}/>
    </BrowserRouter>
  </Provider>,
   document.getElementById('root')
);
