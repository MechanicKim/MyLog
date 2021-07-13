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
import MyLog from './page/MyLog';

class App extends Component {
  render() {
    return (
      <NativeRouter>
        <Route exact path="/" component={Home} />
        <Route exact path="/log" component={MyLog} />
      </NativeRouter>
    );
  }
}

export default App;
