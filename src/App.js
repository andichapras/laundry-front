import React, { Component } from 'react';
import { HashRouter, Route, Switch, BrowserRouter } from 'react-router-dom';

import './scss/style.scss';

import Layout from './hoc/layout/Layout'
import Order from './containers/Order/Order'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

class App extends Component {
  render() {

    return (
      <BrowserRouter>
        <React.Suspense fallback={loading}>
          <Switch>
          <Route path="/" name="Order" render={props => <Layout {...props}/>} />
          </Switch>
        </React.Suspense>
      </BrowserRouter>
    )
  }
}

export default App;
