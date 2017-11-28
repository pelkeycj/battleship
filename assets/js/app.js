import "phoenix_html"
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Landing from './containers/Landing';
import Table from './containers/Table';
import Signin from './containers/Signin';

//TODO restrict routes?
ReactDOM.render(
  <Provider store={store} >
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Signin} />
        <Route exact path="/home" component={Landing}/>
        <Route exact path="/table" component={Table} />
      </Switch>
    </BrowserRouter>
  </Provider>,
   document.getElementById('root')
);
