import React, { Component } from 'react'
import Home from './page/home'
import { Route, BrowserRouter, Switch } from 'react-router-dom'
export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Home} />
        </Switch>
      </BrowserRouter>
    )
  }
}

