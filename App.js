/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import {NativeRouter, Route} from 'react-router-native';

import Home from './page/Home';
import Calendar from './page/Calendar';

class App extends Component {
  render() {
    return (
      <NativeRouter>
        <Route exact path="/" component={Home} />
        <Route exact path="/log/:current" component={Home} />
        <Route exact path="/calendar/:date" component={Calendar} />
      </NativeRouter>
    );
  }
}

export default App;
